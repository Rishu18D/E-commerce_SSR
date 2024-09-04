const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    category: {  // Add category field
        type: String,
        required: false,
        index: true // Index category for faster querying
    },
    createdAt: { // Add createdAt field
        type: Date,
        default: Date.now
    }
});

// Generate a slug before saving the product
productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Product', productSchema);
