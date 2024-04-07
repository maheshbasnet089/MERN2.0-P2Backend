import {Request,Response} from 'express'
import Product from '../database/models/Product'


class ProductController{
    async addProduct(req:Request,res:Response):Promise<void>{
        const {productName,productDescription,productTotalStockQty,productPrice} = req.body 
        let fileName
        if(req.file){
            fileName  = req.file?.filename
        }else{
            fileName = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww"
        }
        if(!productName || !productDescription || !productTotalStockQty || !productPrice){
            res.status(400).json({
                message : "Please provide productName,,productDescription,productTotalStockQty,productPrice"
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStockQty,
            productImageUrl : fileName
        })
        res.status(200).json({
            message : "Product added successfully"
        })
    }
}

export default new ProductController()