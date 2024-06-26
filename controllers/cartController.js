// controllers/cartController.js
const Product = require('../models/Product');
const User = require('../models/User');

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).populate('cart');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('users/cart', { cart: user.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Server Error');
    }
};

exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Ensure user.cart is initialized as an array
        if (!user.cart) {
            user.cart = [];
        }

        // Add product to user's cart if not already added
        if (!user.cart.includes(productId)) {
            user.cart.push(productId);
            await user.save();
            res.redirect('/users/cart');
        } else {
            res.status(400).send('Product already in cart');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Server Error');
    }
};



exports.removeFromCart = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove item from cart
        user.cart.pull(itemId);
        await user.save();

        res.redirect('/users/cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send('Server Error');
    }
};

exports.orderProducts = async (req, res) => {
    try {
        // Logic to order products from cart
        // This could involve creating orders and clearing the cart, etc.
        res.send('Ordering products from cart');
    } catch (error) {
        console.error('Error ordering products:', error);
        res.status(500).send('Server Error');
    }
};
