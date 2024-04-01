
import {Request,Response} from 'express'
import User from '../database/models/User'
import bcrypt from 'bcrypt'


class AuthController{
    public static async registerUser(req:Request,res:Response):Promise<void>{

        const {username,email,password} = req.body 
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }

       await User.create({
            username,
            email,
            password : bcrypt.hashSync(password,12)
        })

        res.status(200).json({
            message : "User registered successfully"
        })
    }
}


export default AuthController