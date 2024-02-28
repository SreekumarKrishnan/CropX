import express from "express"

import { getTransaction } from "../controllers/walletController.js"


const router = express.Router()

router.get("/transaction/:id", getTransaction )

export default router