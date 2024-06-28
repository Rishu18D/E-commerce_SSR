const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.getAddProduct = (req, res) => {
    res.render('products/addProduct');
};

exports.postAddProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body; 
        const newProduct = new Product({ name, price, description, image });

        await newProduct.save();
        res.redirect('/home'); // Redirect to the home page after adding a product
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.slug === 1) {
            console.error("Duplicate key error: A product with the same name already exists.");
            return res.status(400).send("A product with the same name already exists.");
        } else {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }
};

exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            // Handle case where product is not found
            return res.status(404).send('Product not found');
        }

        // Render the product view with the fetched product object
        res.render('products/product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
