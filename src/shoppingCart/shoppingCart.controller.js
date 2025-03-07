import { ShoppingCart } from './shoppingCart.model.js'


export const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await ShoppingCart.findOne();

        if (!cart) {
            cart = new ShoppingCart({ products: [] });
        }

        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            msg: 'Product added to cart',
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error adding product to cart',
            error: err.message
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

        const cart = await ShoppingCart.findOne();

        if (!cart) {
            return res.status(404).json({
                success: false,
                msg: 'Cart not found'
            });
        }

        cart.products = cart.products.filter(item => item.product.toString() !== productId);

        await cart.save();

        res.status(200).json({
            success: true,
            msg: 'Product removed from cart',
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error removing product from cart',
            error: err.message
        });
    }
};

