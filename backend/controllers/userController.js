import {
  findAllUsers,
  findUser,
  updateUser,
  getUsersCount
} from "../database/repository/userDBInteact.js";
import { createBooking } from "../database/repository/bookingDBInteract.js";
import {
  findSpecialistById,
  updateSpecialistById,
} from "../database/repository/specialistDBInteract.js";
import { formateDate } from "../../frontend/src/utils/formateDate.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);
import { ObjectId } from "mongodb";

export const updateUserData = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "updation failed" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await findUser(id);

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "No user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await findAllUsers();

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "No user" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await findUser(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info getting",
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const bookAppointment = async (req, res) => {
  const { specialistId, userId, slotDate, slotTime, ticketPrice } = req.body;
  try {
    const specialist = await findSpecialistById(specialistId);
    const user = await findUser(userId);
    const data = {
      specialist,
      user,
      slotDate,
      slotTime,
      ticketPrice,
    };
    await createBooking(data);

    specialist.slot.map(async (slot, index) => {
      slot.filter(async (item, index1) => {
        if (item.slotDate === slotDate && item.slotTime === slotTime) {
          const updateData = {
            [`slot.${index}.${index1}.is_Booked`]: true,
          };

          await updateSpecialistById(specialistId, updateData);
        }
      });
    });

    res
      .status(200)
      .json({ success: true, message: "Booking successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const makePayment = async (req, res) => {
  try {
    const specialist = await findSpecialistById(req.body.specialistId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: specialist.email,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: [
        {
          price_data: {
            currency: req.body.currency || "inr",
            product_data: {
              name: `Dr.${specialist.fname} ${specialist.lname}`,
              description: `At ${req.body.slotTime} on ${formateDate(
                req.body.slotDate.split("T")[0]
              )}`,
            },
            unit_amount: req.body.ticketPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://cropx.sreekumarkrishnan.live/user/paymentSuccess",
      cancel_url: "https://cropx.sreekumarkrishnan.live/user/paymentFailed",
    });

    // If the currency is INR, restrict shipping to India
    if (req.body.currency === "inr") {
      session.shipping_address_collection = {
        allowed_countries: ["IN"],
      };
    }

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const getAllUsersCount = async (req,res)=>{
  try {
    const data = await getUsersCount()
    res.status(200).json({
      success: true,
      message: "got all users count",
      data: data,
  });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "fetch all users count failed" });
  }
}
