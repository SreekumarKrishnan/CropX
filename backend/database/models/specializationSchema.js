import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    }
})

export default mongoose.model("Specialization", specializationSchema)