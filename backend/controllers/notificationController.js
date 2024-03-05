import { createNotificationDB, getNotificationDataByFarmerId, getNotificationDataBySpecialistId, updateSeenDB, updateSeenDBUser } from "../database/repository/notificationDBInteract.js";
import { findSpecialistById } from "../database/repository/specialistDBInteract.js";
import { findUser } from "../database/repository/userDBInteact.js";

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
        let user
        user = await findUser(id)
        if(!user){
            user = await findSpecialistById(id)
        }
        let result
        if(user.role==="specialist"){
            result = await getNotificationDataBySpecialistId(id)
        }
        if(user.role==="farmer"){
            result = await getNotificationDataByFarmerId(id)
        } 

        
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
        let user
        user = await findUser(id)
        if(!user){
            user = await findSpecialistById(id)
        }
        let result
        
        if(user.role==="specialist"){
            result = await updateSeenDB(id)
        }
        if(user.role==="farmer"){
            result = await updateSeenDBUser(id)
        } 
        
        res.status(200).json({
            success: true,
            message: "update seen notification data successfully",
            data: result,
        }); 
    } catch (error) {
        res.status(500).json({success: false, message: "Seen updation failed"})  
    }
}   