// controllers/userController.js

const User = require('../models/User');
const Order = require('../models/Order');

exports.getProfile = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const user = await User.findById(req.session.userId);
        const orders = await Order.find({ user: req.session.userId }).populate('products');

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('users/profile', { user, orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateProfile = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const { username, password, photo } = req.body; // Include photo in req.body
        const user = await User.findByIdAndUpdate(req.session.userId, { username, password, photo }, { new: true });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect('/users/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
