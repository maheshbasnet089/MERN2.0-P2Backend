import { Request,Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";


class CartController{
    async addToCart(req:AuthRequest,res:Response):Promise<void>{
        const userId  = req.user?.id 
        const {quantity,productId} = req.body 
        if(!quantity || !productId) {
            res.status(400).json({
                message : "Please provide quantity,productId"
            })
        }
        // check if the the product alreay exists in the cart table or not 
        let cartItem = await Cart.findOne({
            where : {
                productId,
                userId
            }
        })
        if(cartItem){
            cartItem.quantity+= quantity
            await cartItem.save()
        }else{
            // insert into Cart table 
           cartItem =  await Cart.create({
                quantity,
                userId,
                productId
            })
        }
        res.status(200).json({
            message : "Product added to cart",
            data : cartItem
        })
    }

    async getMyCarts(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const cartItems  = await Cart.findAll({
            where : {
                userId
            },
            include : [
            {
                model : Product
            }
            ]
        })
        if(cartItems.length ===  0 ){
            res.status(404).json({
                message : "No item in the cart"
            })
        }else{
            res.status(200).json({
                message : "Cart items fetched succesfully",
                data : cartItems
            })
        }
    }
}

export default new CartController()