import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { KhaltiResponse, OrderData, PaymentMethod } from "../types/orderTypes";
import Order from "../database/models/Order";
import Payment from "../database/models/Payment";
import OrderDetail from "../database/models/OrderDetails";
import axios from "axios";



class OrderController{
    async createOrder(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const {phoneNumber,shippingAddress,totalAmount,paymentDetails,items}:OrderData = req.body 
        if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || !paymentDetails.paymentMethod || items.length == 0  ){
            res.status(400).json({
               message :  "Please provide phoneNumber,shippingAddress,totalAmount,paymentDetails,items"
            })
            return
        }

   
        const paymentData = await Payment.create({
            paymentMethod : paymentDetails.paymentMethod
        })
        const orderData =  await Order.create({
            phoneNumber, 
            shippingAddress,
            totalAmount,
            userId,
            paymentId : paymentData.id
        })

        for(var i = 0 ; i<items.length ; i++){
            await OrderDetail.create({
                quantity : items[i].quantity,
                productId : items[i].productId,
                orderId : orderData.id
            })
        }
        if(paymentDetails.paymentMethod === PaymentMethod.Khalti){
            // khalti integration
            const data = {
                return_url : "http://localhost:5173/success/",
                purchase_order_id : orderData.id,
                amount : totalAmount * 100,
                website_url :"http://localhost:5173/",
                purchase_order_name : 'orderName_' + orderData.id
            }
           const response = await  axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
                headers : {
                    'Authorization' : 'key 625cc1cff7cb408b8c84df0f7502a634'
                }
            })
            const khaltiResponse:KhaltiResponse = response.data
            paymentData.pidx = khaltiResponse.pidx 
            paymentData.save()
            res.status(200).json({
                message : "order placed successfully",
                url : khaltiResponse.payment_url
            })
        }else{
            res.status(200).json({
                message : "Order placed successfully"
            })
        }
    }
}

export default new OrderController()