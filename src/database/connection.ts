import {Sequelize} from 'sequelize-typescript'
import User from './models/User'
import Product from './models/Product'
import Category from './models/Category'
import Cart from './models/Cart'
import Order from './models/Order'
import OrderDetail from './models/OrderDetails'
import Payment from './models/Payment'

const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    dialect : 'mysql',
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT),
    models : [__dirname + "/models"]
})

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

sequelize.sync({force : false}).then(()=>{
    console.log("synced !!!")
})

// Relationships  

User.hasMany(Product,{foreignKey : 'userId'})
Product.belongsTo(User,{foreignKey : 'userId'})

Category.hasOne(Product,{foreignKey : 'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})

// product-cart relation 
User.hasMany(Cart,{foreignKey:'userId'})
Cart.belongsTo(User,{foreignKey : 'userId'})

// user-cart relation 
Product.hasMany(Cart,{foreignKey:'productId'})
Cart.belongsTo(Product,{foreignKey:'productId'})

// order-orderdetail relation
Order.hasMany(OrderDetail,{foreignKey:'orderId'})
OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

// orderdetail-product relation 
Product.hasMany(OrderDetail,{foreignKey:'productId'})
OrderDetail.belongsTo(Product,{foreignKey:'productId'})

//order-payment relation 
Payment.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(Payment,{foreignKey:'paymentId'})

//order-user relation 
User.hasMany(Order,{foreignKey : 'userId'})
Order.belongsTo(User,{foreignKey : 'userId'})



export default sequelize