import express,{Router} from 'express'
import authMiddleware from '../middleware/authMiddleware'
import cartController from '../controllers/cartController'
const router:Router = express.Router()

router.route("/")
.post(authMiddleware.isAuthenticated,cartController.addToCart)
.get(authMiddleware.isAuthenticated,cartController.getMyCarts)

router.route("/:productId")
.patch(authMiddleware.isAuthenticated,cartController.updateCartItem)
.delete(authMiddleware.isAuthenticated,cartController.deleteMyCartItem)

export default router 