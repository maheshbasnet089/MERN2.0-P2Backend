import express,{Application,Request,Response} from 'express'

const app:Application = express()
const PORT:number = 3000

import * as dotenv from 'dotenv'
dotenv.config()
import './database/connection'

import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import adminSeeder from './adminSeeder'
import categoryController from './controllers/categoryController'
app.use(express.json())

// admin seeder 
adminSeeder()

// localhost:3000/register
//localhost:3000/hello/register
app.use("",userRoute)
app.use("/admin/product",productRoute)

app.listen(PORT,()=>{
    categoryController.seedCategory()
    console.log("Server has started at port ", PORT)
})

// sudo /Applications/XAMPP/xamppfiles/xampp start