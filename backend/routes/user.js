import express from "express"
import { updateUserData, getSingleUser, getAllUsers, getUserProfile } from "../controllers/userController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"


const router = express.Router()

router.get('/getAllUsers', getAllUsers)
router.get('/getSingleUser/:id', getSingleUser)
router.put('/updateUser/:id', updateUserData)
router.get('/profile',authenticate, restrict(["farmer"]), getUserProfile)


export default router