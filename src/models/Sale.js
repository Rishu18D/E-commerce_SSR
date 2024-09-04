// Sale.js (or wherever your Sale model is defined)
const mongoose = require('mongoose');

// Define Schema for Sale
const saleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Use HTTP link for image
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    description: { type: String, required: true },
    // Add other fields as needed
});

// Create Sale model based on schema
const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
