import {
  createChatPersontoPerson,
  findUsersChats,
  findChatOneToOne,
} from "../database/repository/chatDBInteract.js";
import { findUser } from "../database/repository/userDBInteact.js";
import { findSpecialistById } from "../database/repository/specialistDBInteract.js";

export const createChat = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  try {
    const existingChat = await findChatOneToOne(senderId, receiverId);

    if (existingChat) {
      return res.status(200).json({
        success: true,
        message: "chat already existing",
        data: existingChat,
      });
    }

    const result = await createChatPersontoPerson(senderId, receiverId);
    res.status(200).json({
      success: true,
      message: "chat successfully created",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "chat creation failed" });
  }
};

export const userChats = async (req, res) => {
  try {
    const result = await findUsersChats(req.params.userId);
    res.status(200).json({
      success: true,
      message: "successfully find user chats",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Users chats find failed" });
  }
};

export const findChat = async (req, res) => {
  try {
    const result = await findChatOneToOne(
      req.params.firstId,
      req.params.secondId
    );
    res.status(200).json({
      success: true,
      message: "successfully find user one to one chats",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "find chat failed" });
  }
};

export const findUserForChat = async (req, res) => {
  try {
    const userDetails = await findUser(req.body.userId);
    const specialistDetails = await findSpecialistById(req.body.userId);

    if (!userDetails && !specialistDetails) {
      return res.status(404).json({ message: "User or doctor not found" });
    }

    if (userDetails) {
      return res.status(200).json({
        success: true,
        message: "got user",
        data: userDetails,
      });
    }

    return res.status(200).json({
      success: true,
      message: "got specialist",
      data: specialistDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
