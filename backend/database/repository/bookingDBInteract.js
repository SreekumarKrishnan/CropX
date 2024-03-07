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

export const findBookingDataByUserId = async(id)=>{
    const userId = new ObjectId(id)
    try {
        const bookingData = await Booking.aggregate([{$match:{"user._id":userId}}])
        return bookingData
    } catch (error) {
        console.log(error);
    }
}
export const findBookingDataByBookingId = async(id)=>{
    try {
        const bookingData = await Booking.findById(id)
        return bookingData
    } catch (error) {
        console.log(error);
    }
}
export const findBookingIdAndUpdate = async(id,updateData)=>{
    try {
        const updatedData = await Booking.findByIdAndUpdate(id,{$set:updateData},{new:true})
        return updatedData
    } catch (error) {
        console.log(error);
    }
}
export const bookingPerAppointmentDate = async()=>{
    try {
        const data = await Booking.aggregate([{$match:{status:{$ne:"Cancelled"}}},{$group:{_id:"$appointmentDate",totalBookings: { $sum: 1 }}},{$sort:{_id:1}}])
        return data
    } catch (error) {
        console.log(error);
    }
}
export const getBookingsCount = async()=>{
    try {
      const data = await Booking.find({"status":{$eq:"Completed"}}).count()
      return data
    } catch (error) {
      console.log(error);
    }
}
export const totalBookingRevenue = async()=>{
    try {
        const data = await Booking.aggregate([{$match:{"status":{$ne:"Cancelled"}}},{$group:{_id:null,"totalRevenue":{$sum:{$toInt:"$ticketPrice"}}}}])
        return data[0].totalRevenue
    } catch (error) {
        console.log(error);
    }
}
export const bookingsPerSpecialization = async()=>{
    try {
       const data = await Booking.aggregate([{$group:{_id:"$specialist.specialization",appointments:{$push:{status:"$status",ticketprice:"$ticketPrice"}}}},{$unwind: "$appointments"},{$match: {"appointments.status": { $ne: "Cancelled" }}},{$lookup:{from:"specializations",localField:"_id",foreignField:"_id",as:"specialization"}},{$unwind:"$specialization"},{$project:{_id:1,specializationName:"$specialization.name",appointments:"$appointments"}},{$group: {_id: "$_id",specializationName: { $first: "$specializationName" },appointmentCount: { $sum: 1 },totalTicketPrice:{$sum:{$toInt:"$appointments.ticketprice"}}}}])
       return data 
    } catch (error) {
        console.log(error);
    }
}

export const bookingsPerId = async(id)=>{
    
    try {
        const bookingData = await Booking.aggregate([{$match:{"specialist._id":new ObjectId(id)}}]).sort({createdAt:-1}) 
        return bookingData
    } catch (error) {
        console.log(error);
    }
}