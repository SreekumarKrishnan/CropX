import express from "express"
import { authenticate, restrict } from "../auth/verifyToken.js"

import { createNotification, getNotificationData, updateSeen } from "../controllers/notificationController.js"


const router = express.Router()

router.get('/getData/:id',getNotificationData) 
router.post('/create', createNotification)
router.patch('/updateSeen/:id', updateSeen)

export default router 
   