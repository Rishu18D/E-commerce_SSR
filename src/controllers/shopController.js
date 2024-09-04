// shopController.js

const Product = require('../models/Product');

// Controller function to render the shop page
exports.getShopPage = async (req, res) => {
    try {
        let filters = {};
        let sortOption = {};

        // Check for search query
        if (req.query.search) {
            filters.name = { $regex: new RegExp(req.query.search, 'i') }; // Case-insensitive search
        }

        // Check for category filter
        if (req.query.category && req.query.category !== 'All') {
            filters.category = req.query.category;
        }

        // Check for sorting option
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price-asc':
                    sortOption.price = 1; // Ascending order
                    break;
                case 'price-desc':
                    sortOption.price = -1; // Descending order
                    break;
                case 'latest':
                default:
                    sortOption.createdAt = -1; // Latest products first
                    break;
            }
        } else {
            sortOption.createdAt = -1; // Default to latest products first
        }

        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const limit = 9; // Number of products per page
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find(filters).sort(sortOption).skip(skip).limit(limit);

        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
        };

        res.render('shop', { products, req, pagination }); // Pass req and pagination object to the template
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
};