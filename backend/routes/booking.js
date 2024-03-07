import express from "express"

import { bookingPerDate, cancelBooking, getAllBookingCount, getBookingPerId, getTotalBookingRevenue, getTotalBookingsPerSpecialization } from "../controllers/bookingController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"

const router = express.Router()

router.get("/getDataPerAppointmentDate", bookingPerDate)
router.get("/totalBookingCount", getAllBookingCount)
router.get("/totalBookingRevenue", getTotalBookingRevenue)
router.get("/totalBookingsPerSpecialization", getTotalBookingsPerSpecialization)
router.get("/getDataPerId/:id", getBookingPerId)
router.patch(
    "/cancelBooking/:id1/:id2",
    authenticate,
    restrict(["specialist","farmer"]),
    cancelBooking 
  );

export default router

