import express from "express"
import { createChat, userChats, findChat, findUserForChat } from "../controllers/chatController.js"


const router = express.Router()

router.post("/", createChat)
router.post("/findUserForChat", findUserForChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)

export default router