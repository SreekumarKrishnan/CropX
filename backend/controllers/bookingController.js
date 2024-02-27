import {bookingPerAppointmentDate, bookingsPerSpecialization, findBookingDataByBookingId, findBookingIdAndUpdate, getBookingsCount, totalBookingRevenue} from "../database/repository/bookingDBInteract.js"
import { findSpecialistById, updateSpecialistById } from "../database/repository/specialistDBInteract.js";
import { findUser } from "../database/repository/userDBInteact.js";
import { findWalletById, refundTowallet } from "../database/repository/walletDBInteract.js";


export const cancelBooking = async (req, res) => {
    const id1 = req.params.id1;
    const userId = req.params.id2;
  
    try {
      let user;
      user = await findUser(userId);
      if (!user) {
        user = await findSpecialistById(userId);
      }
  
      const bookingData = await findBookingDataByBookingId(id1);
  
      if (user.role === "farmer") {
        const updateData1 = { status: "Cancelled", isCancelledBy: "farmer" };
  
        await findBookingIdAndUpdate(id1, updateData1);
  
        
        const specialist = await findSpecialistById(bookingData.specialist._id);
        specialist.slot.map(async (slot, index) => {
          slot.filter(async (item, index1) => {
            if (
              item.slotDate === bookingData.appointmentDate &&
              item.slotTime === bookingData.appointmentTime
            ) {
              const updateData = {
                [`slot.${index}.${index1}.is_Booked`]: false,
              };
  
              await updateSpecialistById(specialist._id, updateData);
            }
          });
        });
      }
      if (user.role === "specialist") {
        const updateData1 = { status: "Cancelled", isCancelledBy: "specialist" };
        
        await findBookingIdAndUpdate(id1, updateData1);
      }
  
      const updatedBookingData = await findBookingDataByBookingId(id1);
  
      const existingWallet = await findWalletById(updatedBookingData.user._id)
      const existingAmount = existingWallet ? existingWallet.currentWalletAmount : 0

      await refundTowallet(updatedBookingData,existingAmount)
  
      res.status(200).json({
        success: true,
        message: "successfully cancelled booking",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "booking cancellation failed" });
    }
  };

export const bookingPerDate = async(req,res)=>{
    try {
        const data = await bookingPerAppointmentDate()
        res.status(200).json({
            success: true,
            message: "got bookingdata per appointment date",
            data: data,
        });
    } catch (error) {
        res.status(500).json({success: false, message: "fetching bookingdata per appointment date failed"})
    }
}

export const getAllBookingCount = async (req,res)=>{
    try {
      const data = await getBookingsCount()
      res.status(200).json({
        success: true,
        message: "got all bookings count",
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "fetch all bookings count failed" });
    }
}

export const getTotalBookingRevenue = async (req,res)=>{
    try {
        const data = await totalBookingRevenue()
        res.status(200).json({
            success: true,
            message: "got all bookings total",
            data: data,
        });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "fetch all bookings total failed" });
    }
}

export const getTotalBookingsPerSpecialization = async (req,res)=>{
    try {
        const data = await bookingsPerSpecialization()
        res.status(200).json({
            success: true,
            message: "got all bookings per specialization",
            data: data,
        });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "fetch all bookings bookings per failed" });
    }
}