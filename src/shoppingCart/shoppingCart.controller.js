import { ShoppingCart } from './shoppingCart.model.js';
import Product from '../product/product.model.js';
import Bill from '../bill/bill.model.js';



export const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const { usuario } = req; 
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        if (product.stock === 0) {
            return res.status(400).json({
                success: false,
                message: 'Product out of stock',
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: `There are few units available for the product ${product.nameProduct}`,
            });
        }

        let cart = await ShoppingCart.findOne({ user: usuario._id });

        if (!cart) {
            cart = new ShoppingCart({ user: usuario._id, products: [] });
        }

        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            if (existingProduct.quantity + quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `There are few units available for the product ${product.nameProduct}`,
                });
            }

            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error adding product to cart',
            error: err.message,
        });
    }
};

export const getCartProducts = async (req, res) => {
    try {
        const cart = await ShoppingCart.findOne().populate('products.product');
        if (!cart) {
            return res.status(404).json({
                success: false,
                msg: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            products: cart.products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error getting cart products',
            error: err.message
        });
    }
};


export const deleteProductFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { usuario } = req;

        const cart = await ShoppingCart.findOne({ user: usuario._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== productId);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product removed from cart',
            cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error removing product from cart',
            error: err.message,
        });
    }
};

