import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        members:{
            type : Array
        },
        messageCount:{
            type : Number,
            default : 0
        }
    },
    {
        timestamps : true
    }

)



export default mongoose.model("Chat", chatSchema)