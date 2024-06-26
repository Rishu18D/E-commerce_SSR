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
    image: { // Add this field to store the image URL
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
});

// Generate a slug before saving the product
productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Product', productSchema);
