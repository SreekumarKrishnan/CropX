import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number },
  password: { type: String, required: true },
  photo: { type: String },
  role: {type: String,},
  gender: { type: String, enum: ["select", "male", "female", "other"] },
  is_Blocked: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);