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
            products: [productId],
            status: 'Pending'
        });

        await order.save();
        scheduleOrderStatusUpdate(order._id); // Schedule status updates
        res.redirect('/home');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Server Error');
    }
};

exports.renderOrderSummaryPage = async (req, res) => {
    try {
        const { productId } = req.query;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('users/order-summary', { product });
    } catch (error) {
        console.error('Error rendering order summary page:', error);
        res.status(500).send('Server Error');
    }
};

exports.processOrderSummary = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('users/order-summary', { product });
    } catch (error) {
        console.error('Error processing order summary:', error);
        res.status(500).send('Server Error');
    }
};


const scheduleOrderStatusUpdate = (orderId) => {
    const statusUpdates = [
        { status: 'Processing', delay: 1000 * 60 * 60 * 12 }, // 12 hours
        { status: 'Shipped', delay: 1000 * 60 * 60 * 24 },    // 1 day
        { status: 'Completed', delay: 1000 * 60 * 60 * 48 }   // 2 days
    ];

    statusUpdates.forEach(update => {
        setTimeout(async () => {
            try {
                await Order.findByIdAndUpdate(orderId, { status: update.status });
            } catch (error) {
                console.error(`Error updating order status to ${update.status}:`, error);
            }
        }, update.delay);
    });
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

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        if (order.user.toString() !== req.session.userId) {
            return res.status(403).send('Unauthorized');
        }

        if (['Completed', 'Cancelled'].includes(order.status)) {
            return res.status(400).send('Cannot cancel a completed or already cancelled order');
        }

        order.status = 'Cancelled';
        await order.save();

        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).send('Server Error');
    }
};

exports.completeOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        order.status = 'Completed';
        await order.save();

        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).send('Server Error');
    }
};
