import { Router } from "express";
import {
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
    updateQuantityOfProductController,
    deleteAllProductsToCartController
} from '../controllers/cartController.js';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const router = Router();

router.post('/', createCartController);
router.put('/:prodId', addProductToCartController);
router.put('/quantity/:prodId', updateQuantityOfProductController);
router.delete('/', deleteAllProductsToCartController);
router.delete('/:prodId', deleteProductToCartController);

export default router