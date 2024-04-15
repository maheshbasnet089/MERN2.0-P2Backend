import express,{Router} from 'express'
import authMiddleware from '../middleware/authMiddleware'
import errorHandler from '../services/catchAsyncErrror'
import orderController from '../controllers/orderController'
const router:Router = express.Router()

router.route('/').post(authMiddleware.isAuthenticated,errorHandler(orderController.createOrder))

export default router 