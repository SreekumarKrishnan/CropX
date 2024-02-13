import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    specialist: {
      type: Object
    },
    user: {
      type: Object
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    isCancelledBy:{
      type: String,
      enum: ["farmer", "specialist", "none"],
      default: "none",
    },
    is_Booked: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);