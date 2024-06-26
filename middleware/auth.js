// middleware/auth.js

const User = require('../models/User');

// Middleware to check if user is authenticated
exports.authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
};

// Middleware to fetch current user details
exports.getCurrentUser = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const currentUser = await User.findById(req.session.userId);
            if (!currentUser) {
                // If user not found, clear session and redirect to login
                req.session.destroy(() => {
                    res.clearCookie('connect.sid');
                    res.redirect('/auth/login');
                });
                return;
            }
            res.locals.currentUser = currentUser;
            next();
        } catch (error) {
            console.error('Error fetching current user:', error);
            next(error);
        }
    } else {
        res.locals.currentUser = null;
        next();
    }
};
