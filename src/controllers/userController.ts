
import {Request,Response} from 'express'
import User from '../database/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../middleware/authMiddleware'


class AuthController{
    public static async registerUser(req:Request,res:Response):Promise<void>{

            
        const {username,email,password,role} = req.body 
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }

       await User.create({
            username,
            email,
            password : bcrypt.hashSync(password,12),
            role : role
        })

        res.status(200).json({
            message : "User registered successfully"
        })


    }

    public static async loginUser(req:Request,res:Response) : Promise<void>{
        // user input 
        const {email,password} = req.body 
        if(!email || !password){
            res.status(400).json({
                message : "Please provide email,password"
            })
            return
        }
        // check whether user with above email exist or not 
         
        const [data] = await User.findAll({
            where : {
                email : email
            }
        })
        if(!data){
            res.status(404).json({
                message : "No user with that email"
            })
            return
        }

        // check password now 
        const isMatched  =  bcrypt.compareSync(password,data.password)
        if(!isMatched){
            res.status(403).json({
                message : "Invalid password"
            })
            return
        }

        // generate token 
       const token  =  jwt.sign({id:data.id},process.env.SECRET_KEY as string,{
            expiresIn : "20d"
        })
        res.status(200).json({
            message : "Logged in successfully",
            data : token
        })


    }

    public static async fetchUsers(req:AuthRequest,res:Response):Promise<void>{

        const users = await User.findAll()
        if(users.length > 0 ){
            res.status(200).json({
                message : "order fetched successfully",
                data : users
            })
        }else{
            res.status(404).json({
                message : "you haven't ordered anything yet..",
                data : []
            })
        }
    }
}


export default AuthController