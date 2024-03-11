import {
  findUserByEmail,
  createUser,
} from "../database/repository/userDBInteact.js";
import {
  findSpecialist,
  createSpecialist,
} from "../database/repository/specialistDBInteract.js";
import { findAdmin } from "../database/repository/adminDBInteract.js";
import { passwordMatch } from "../services/bcryptService.js";
import { generateAdminToken, generateToken } from "../services/jwtService.js";
import { generateOTP, sendOTPEmail } from "../services/mailSender.js";

export const register = async (req, res) => {
  try {
    const { email, role } = req.body;

    const userData = req.body;

    let user = null;
    const findData = { email: email };

    if (role === "farmer") {
      user = await findUserByEmail(findData);
    } else if (role === "specialist") {
      user = await findSpecialist(findData);
    }

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist in same email" });
    }

    if (role === "farmer") {
      await createUser(userData);
    }

    if (role === "specialist") {
      await createSpecialist(userData);
    }

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;

    const findData = { email: email };

    const farmer = await findUserByEmail(findData);

    const specialist = await findSpecialist(findData);

    if (farmer) {
      user = farmer;
    }
    if (specialist) {
      user = specialist;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_Blocked) {
      return res.status(401).json({ message: "You are Blocked" });
    }

    const isPasswordMatch = await passwordMatch(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = await generateToken(user);

    res.status(200).json({
      data: {
        success: true,
        message: "Login succefull",
        token,
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        photo: user.photo,
        role: user.role,
        gender: user.gender,
        qualification: user.qualification,
        certificate: user.certificate,
        is_blocked: user.is_Blocked,
        is_Approved: user.is_Approved,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;

    user = await findAdmin(email);

    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    

    const token = await generateAdminToken(user);


    res
      .status(200)
      .json({
        message: "Admin login successful",
        token,
        _id: user._id,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    sendOTPEmail(email, otp);
    res.status(200).json({ message: "Otp sent successfully", otp: otp });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to sent otp" });
  }
};
