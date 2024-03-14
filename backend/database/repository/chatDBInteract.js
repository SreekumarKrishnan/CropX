import Chat from "../../database/models/chatSchema.js"

export const createChatPersontoPerson = async (senderId, receiverId) => {
  try { 

    const newChat = new Chat({
      members: [senderId, receiverId],
    });

    const result = await newChat.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const findUsersChats = async (userId)=>{
  try {
    const chat = await Chat.find({members:{$in:[userId]}})
    return chat
  } catch (error) {
    console.log(error);
  }
}

export const findChatOneToOne = async(firstId,secondId)=>{
  try {
    const chat = await Chat.findOne({members:{$all:[firstId,secondId]}})
    return chat
  } catch (error) {
    console.log(error);
  }
}

export const incMessageCount = async (chatId) => {
  try {
    const result = await Chat.findByIdAndUpdate(
      chatId,
      { $inc: { messageCount: 1 } },
      { new: true } 
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};