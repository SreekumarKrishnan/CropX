import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './database/connectDB.js'
import authRoute from './routes/auth.js'
import adminRoute from './routes/admin.js'
import specialistRoute from './routes/specialist.js'
import userRoute from './routes/user.js'
import chatRoute from "./routes/chat.js"
import messageRoute from "./routes/message.js"
import bookingRoute from "./routes/booking.js"
import walletRoute from "./routes/wallet.js"
import notificationRoute from "./routes/notification.js"
import http from "http"
import { Server } from "socket.io"

const app = express()
import dotenv from 'dotenv'

dotenv.config()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});



let activeUsers = []; 

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const recipientSocket = activeUsers.find((user) => user.userId === receiverId);
    if (recipientSocket) {
      io.to(recipientSocket.socketId).emit("receive-message", data);
    }
  });

  socket.on('typing',(id)=>{
    io.emit('typingSend',{id})
  })

  socket.on("new-booking",(result)=>{
    io.emit("notify-specialist",{message:result})
  })
 
});

   
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
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/booking', bookingRoute ) 
app.use('/api/v1/wallet', walletRoute )
app.use('/api/v1/notification', notificationRoute)

const port = process.env.PORT

server.listen(port, ()=>{
    connectDB()
    console.log(`server is running on port ${port}`);  
})  