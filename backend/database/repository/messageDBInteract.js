import Message from "../models/messageSchema.js"

export const createMessage = async (chatId,senderId,text)=>{
    try {
        const message = new Message({
            chatId,
            senderId,
            text
        })
        const result = await message.save()
        return result
    } catch (error) {
        console.log(error);
    }
}

export const getMessgeOfPerson = async (chatId)=>{
    try {
        const result = await Message.find({chatId})
        return result
    } catch (error) {
        console.log(error);
    }
}