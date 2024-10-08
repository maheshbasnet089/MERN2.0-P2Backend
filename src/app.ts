import express,{Application,Request,Response} from 'express'

const app:Application = express()
const PORT:number = 3000

import * as dotenv from 'dotenv'
dotenv.config()
import './database/connection'

import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import categoryRoute from './routes/categoryRoute'
import adminSeeder from './adminSeeder'
import categoryController from './controllers/categoryController'
import cartRoute from './routes/cartRoute'
import orderRoute from './routes/orderRoute'
import cors from 'cors'
import { Server } from 'socket.io'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from './database/models/User'

app.use(cors({
    origin : '*'
}))
app.use(express.json())

// admin seeder 
adminSeeder()

// localhost:3000/register
//localhost:3000/hello/register
app.use("",userRoute)
app.use("/admin/product",productRoute)
app.use("/admin/category",categoryRoute)
app.use("/customer/cart",cartRoute)
app.use("/order",orderRoute)

const server = app.listen(PORT,()=>{
    categoryController.seedCategory()
    console.log("Server has started at port ", PORT)
})
const io = new Server(server,{
    cors : {
        origin : ['http://localhost:5173','http://localhost:5174']
    }
})

let onlineUsers:any = []
const addToOnlineUsers = (socketId:string,userId:string,role:string)=>{
    onlineUsers = onlineUsers.filter((user:any)=>user.userId !==userId)
    onlineUsers.push({socketId,userId,role})
}
io.on("connection",async (socket)=>{
    console.log("A client connected")
    const {token} = socket.handshake.auth 
    if(token){
        //@ts-ignore
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
        //@ts-ignore
        const doesUserExists = await User.findByPk(decoded.id)
        if(doesUserExists){
            addToOnlineUsers(socket.id,doesUserExists.id,doesUserExists.role)
        }
    }
    socket.on("updatedOrderStatus",({status,orderId,userId})=>{
        const findUser = onlineUsers.find((user:any)=>user.userId == userId)
        if(findUser){
            io.to(findUser.socketId).emit("statusUpdated",
                {status,orderId}
            )
        }
    })
    console.log(onlineUsers)
})

// sudo /Applications/XAMPP/xamppfiles/xampp start