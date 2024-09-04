// salesController.js
const Sale = require('../models/Sale');

// Controller function to render the sales page
exports.getSalesPage = async (req, res, next) => {
    try {
        // Fetching sales data from the Sale model
        const sales = await Sale.find();

        // Render 'sales.ejs' with fetched sales data
        res.render('sales', {
            title: 'Sales', // Optional: You can set a title for the page
            sales: sales,
            currentUser: res.locals.currentUser // Assuming currentUser is set by authMiddleware
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).send('Server Error');
    }
};

// Controller function to handle adding a new sale
exports.addSale = async (req, res, next) => {
    try {
        const { name, originalPrice, salePrice, description, image } = req.body;

        // Create new Sale document
        const newSale = new Sale({
            name,
            image,
            originalPrice,
            salePrice,
            description
        });

        // Save the new sale
        await newSale.save();

        // Redirect to sales page after adding
        res.redirect('/sales');
    } catch (error) {
        console.error('Error adding sale:', error);
        res.status(500).send('Server Error');
    }
};
