import Notification from '../models/notificationSchema.js'


export const createNotificationDB = async (data)=>{
    const { userId, specialistId, message } = data
    try {
        const notification = new Notification({
            userId,
            specialistId,
            message
        })
        await notification.save()
    } catch (error) {
        console.log(error);
    }
}

export const getNotificationDataBySpecialistId = async (id)=>{
    try {
        const data = await Notification.aggregate([
            {
              $match: {
                specialistId: id,
                is_Seen: false
              }
            },
            {
              $sort: {
                createdAt: -1
              }
            }
          ]);
        return data 
    } catch (error) {
        console.log(error);
    }
}

export const updateSeenDB = async(id)=>{
    try {
        const data = await Notification.updateMany({specialistId:id},{$set:{is_Seen:true}})
        return data
    } catch (error) {
        console.log(error);
    }
}