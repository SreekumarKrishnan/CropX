import express from 'express'
import { register, login, adminLogin, sendOtp } from '../controllers/authController.js'


const router = express.Router()

router.post('/register', register) 
router.post('/login', login)
router.post('/adminLogin', adminLogin)
router.post('/sendOtp', sendOtp)

export default router  