import mongoose from "mongoose";

const SpecialistSchema = new mongoose.Schema({

  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number },
  gender : { type: String, enum: ["select", "male", "female", "other"] },
  qualification: { type: String},
  specialization : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Specialization",
    required : true
  },
  certificate : { type: String },
  password: { type: String, required: true },
  photo: { type: String },
  experiences: { type : Array },
  slot: {type : Array},
  role: {type: String},
  is_Blocked : {type:Boolean, default:false},
  is_Approved: {
    type: Boolean,
    default: false,
  },
}); 

export default mongoose.model("Specialist", SpecialistSchema);
