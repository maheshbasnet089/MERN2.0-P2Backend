import {Sequelize} from 'sequelize-typescript'
import User from './models/User'
import Product from './models/Product'
import Category from './models/Category'
import Cart from './models/Cart'

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




export default sequelize