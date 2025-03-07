import { Router } from 'express';
import { addProductToCart, getCartProducts, deleteProductFromCart , completePurchase} from './shoppingCart.controller.js'
import { addProductToCartValidator, getCartProductsValidator, deleteProductFromCartValidator } from '../middlewares/shoppingCart-validator.js'

const router = Router();

router.post('/add', addProductToCartValidator, addProductToCart);

router.get('/', getCartProductsValidator, getCartProducts);

router.delete('/delete', deleteProductFromCartValidator, deleteProductFromCart);

router.post('/purchase', completePurchase);


export default router;
