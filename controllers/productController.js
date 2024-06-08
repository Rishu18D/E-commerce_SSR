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
        const { name, price, description } = req.body;
        const newProduct = new Product({ name, price, description });

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
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render('products/product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
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
