import express from "express"
import { createChat, userChats, findChat, findUserForChat, updateLastSeen } from "../controllers/chatController.js"


const router = express.Router()

router.post("/", createChat)
router.post("/findUserForChat", findUserForChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)
router.patch('/updateLastSeen', updateLastSeen)

export default router