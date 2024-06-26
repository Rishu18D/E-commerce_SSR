// shopController.js

const Product = require('../models/Product');

// Controller function to render the shop page
exports.getShopPage = async (req, res) => {
    try {
        let filters = {};

        // Check for search query
        if (req.query.search) {
            filters.name = { $regex: new RegExp(req.query.search, 'i') }; // Case-insensitive search
        }

        // Check for category filter
        if (req.query.category && req.query.category !== 'All') {
            filters.category = req.query.category;
        }

        const products = await Product.find(filters);
        res.render('shop', { products, req }); // Pass req object to the template if needed
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
};
