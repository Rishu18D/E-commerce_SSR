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
            products: [product._id],
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

exports.completeOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: 'Completed' });
        res.redirect('/orders');
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).send('Server Error');
    }
};
