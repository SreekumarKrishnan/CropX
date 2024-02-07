import Booking from "../../database/models/bookingSchema.js"
import {ObjectId}  from "mongodb"

export const createBooking = async(data)=>{
    try {
        const { specialist, user, slotDate, slotTime, ticketPrice } = data
        const booking = new Booking({
            specialist : specialist,
            user : user,
            ticketPrice : ticketPrice,
            appointmentDate : slotDate,
            appointmentTime : slotTime
        })
        await booking.save()
    } catch (error) {
        console.error(error)
    }
}

export const findAllBookingData = async()=>{
    try {
        const bookingData = await Booking.find()
        return bookingData
    } catch (error) {
        console.log(error);
    }
}

export const findBookingDataById = async(id)=>{
    const userId = new ObjectId(id)
    try {
        const bookingData = await Booking.aggregate([{$match:{"user._id":userId}}])
        return bookingData
    } catch (error) {
        console.log(error);
    }
}