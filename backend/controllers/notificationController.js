import { createNotificationDB, getNotificationDataBySpecialistId, updateSeenDB } from "../database/repository/notificationDBInteract.js";

export const createNotification = async(req,res)=>{
    
    try {
        const notification = await createNotificationDB(req.body)
        res.status(200).json({
            success: true,
            message: "notification created successfully",
            data: notification,
        });
    } catch (error) {
        res.status(500).json({success: false, message: "creating notification failed"})
    }
}
export const getNotificationData = async(req,res)=>{
    const id = req.params.id
    try {
        const result = await getNotificationDataBySpecialistId(id)
        res.status(200).json({
            success: true,
            message: "got notification data successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({success: false, message: "getting notification data failed"})
    }
}

export const updateSeen = async (req,res)=>{
    const id = req.params.id
    try {
        const result = await updateSeenDB(id)
        res.status(200).json({
            success: true,
            message: "update seen notification data successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({success: false, message: "Seen updation failed"})  
    }
}