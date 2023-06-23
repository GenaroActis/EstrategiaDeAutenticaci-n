import { Router } from 'express'
import {
    renderRegisterController,
    renderLoginController,
    renderRegisterErrorController,
    renderLoginErrorController, 
    getAllProductsController,
    getCartController,
    renderProfile
} from '../controllers/viewsController.js'
const router = Router();

router.get('/cart', getCartController);
router.get('/products', getAllProductsController);
router.get('/register', renderRegisterController)
router.get('/login', renderLoginController)
router.get('/register/Error', renderRegisterErrorController)
router.get('/login/Error', renderLoginErrorController)
router.get('/github-profile', renderProfile)

export default router