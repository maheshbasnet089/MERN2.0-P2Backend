import express,{Router} from 'express'
import authMiddleware from '../middleware/authMiddleware'
import cartController from '../controllers/cartController'
const router:Router = express.Router()

router.route("/").post(authMiddleware.isAuthenticated,cartController.addToCart)

export default router 