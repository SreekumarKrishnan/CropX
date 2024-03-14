import { incMessageCount } from "../database/repository/chatDBInteract.js";
import { createMessage, getMessgeOfPerson } from "../database/repository/messageDBInteract.js";

export const addMessage = async(req,res)=>{
    const {chatId , senderId, text} = req.body
    try {
        const result = await createMessage(chatId,senderId,text)
        await incMessageCount(chatId)
        res.status(200).json({
            success: true,
            message: "message added successfully",
            data: result,
          });
    } catch (error) {
        res.status(500).json({success: false, message: "add message failed"})
    }
}

export const getMessage = async (req,res)=>{
    const {chatId} = req.params
    try {
        const result = await getMessgeOfPerson(chatId)
        res.status(200).json({
            success: true,
            message: "Get message successfully",
            data: result,
          });
    } catch (error) {
        res.status(500).json({success: false, message: "get message failed"})
    }
}