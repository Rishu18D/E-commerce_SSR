const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const order = new Order({
            user: req.session.userId,
            products: [productId], // Store productId directly in products array
            status: 'Completed' // Change status to "Completed" since the product is being bought
        });

        await order.save();
        res.redirect('/home'); // Redirect to home page after purchase
    } catch (error) {
        console.error('Error buying product:', error);
        res.status(500).send('Server Error');
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.session.userId }).populate('products');
        res.render('orders/index', { orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server Error');
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products');
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.render('orders/order', { order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).send('Server Error');
    }
};

// controllers/orderController.js

exports.completeOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });
        res.redirect('/orders'); // Redirect to order history page after cancelling
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).send('Server Error');
    }
};


exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        // Check if the order belongs to the current user
        if (order.user.toString() !== req.session.userId) {
            return res.status(403).send('Unauthorized');
        }

        // Check if the order is cancellable (e.g., not already completed)
        if (order.status === 'Completed') {
            return res.status(400).send('Cannot cancel a completed order');
        }

        // Update order status to 'Cancelled'
        order.status = 'Cancelled';
        await order.save();

        res.redirect('/users/profile'); // Redirect to profile page after cancellation
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).send('Server Error');
    }
};
