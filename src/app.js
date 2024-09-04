// app.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path'); 
const app = express();

// Require database configuration
require('./config/database');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for static file serving
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_here', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to set currentUser in res.locals
const { getCurrentUser } = require('./middleware/auth');
app.use(getCurrentUser);

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const shopRoutes = require('./routes/shopRoutes');
const salesRoutes = require('./routes/salesRoutes');
const infoRoutes = require('./routes/infoRoutes');

// Mount routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/users/cart', cartRoutes);
app.use('/shop', shopRoutes);
app.use('/sales', salesRoutes);
app.use('/', infoRoutes); 

// Handle POST request for creating an order
app.post('/products/order', async (req, res) => {
    // Example: Process order creation logic here
    const { productId } = req.body;
    // Perform actions like creating an order, updating inventory, etc.
    res.send('Order created successfully');
});

// Route to render addSales page
app.get('/sales/add', (req, res) => {
    res.render('addSales'); // Ensure 'addSales.ejs' is in the views directory
});

// Home route (Landing page)
app.get('/', (req, res) => {
    if (req.session && req.session.userId) {
        res.redirect('/home');
    } else {
        res.render('auth/landing');
    }
});

// Authenticated home route
app.get('/home', async (req, res) => {
    if (req.session && req.session.userId) {
        try {
            const products = await require('./models/Product').find();
            const sales = await require('./models/Sale').find(); // Fetch sales data too if needed
            res.render('home', { products, sales });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/auth/login');
    }
});

// Temporary route to check session
app.get('/check-session', (req, res) => {
    res.send(req.session);
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Open http://localhost:${PORT} in your browser`);
});
