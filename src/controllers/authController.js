// authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    try {
        const { username, password, isSeller } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, seller: isSeller === 'on' });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server Error');
    }
};

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            res.redirect('/home'); // Redirect to home page after login
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server Error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server Error');
        }
        res.redirect('/auth/login');
    });
};
