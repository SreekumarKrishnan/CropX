import mongoose from "mongoose";

const SpecialistSchema = new mongoose.Schema({

  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number },
  qualification: { type: String},
  specialization : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Specialization",
  },
  certificate : { type: String },
  password: { type: String, required: true },
  photo: { type: String },
  experiences: { type : Array },
  slot: {type : Array},
  role: {type: String},
  fee : {type: Number},
  is_Blocked : {type:Boolean, default:false},
  is_Approved: {
    type: Boolean,
    default: false,
  },
  lastSeen: { type : Date , required : false }
}); 

export default mongoose.model("Specialist", SpecialistSchema);
