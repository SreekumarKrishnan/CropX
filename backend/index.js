import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './database/connectDB.js'
import authRoute from './routes/auth.js'
import adminRoute from './routes/admin.js'
import specialistRoute from './routes/specialist.js'
import userRoute from './routes/user.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

 
const corsOptions = {
    origin:true
}  

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/specialist', specialistRoute)
app.use('/api/v1/user', userRoute) 

const port = process.env.PORT

app.listen(port, ()=>{
    connectDB()
    console.log(`server is running on port ${port}`);  
}) 