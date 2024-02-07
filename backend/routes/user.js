import express from "express"
import { updateUserData, getSingleUser, getAllUsers, getUserProfile, bookAppointment, makePayment } from "../controllers/userController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"


const router = express.Router()

router.get('/getAllUsers', getAllUsers)
router.get('/getSingleUser/:id', getSingleUser)
router.put('/updateUser/:id', updateUserData)
router.get('/profile',authenticate, restrict(["farmer"]), getUserProfile)
router.post('/makePayment',authenticate, restrict(["farmer"]), makePayment)
router.post('/bookAppointment', authenticate, restrict(["farmer"]), bookAppointment)

export default router