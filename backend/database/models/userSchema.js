import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number },
  password: { type: String, required: true },
  photo: { type: String },
  role: {type: String,},
  is_Blocked: { type: Boolean, default: false },
  lastSeen: { type : Date , required : false }
});

export default mongoose.model("User", UserSchema);