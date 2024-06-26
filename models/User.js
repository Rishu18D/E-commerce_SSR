// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    seller: { type: Boolean, default: false }, // New field to indicate if the user is a seller
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Array of ObjectIds referencing Products
});

module.exports = mongoose.model('User', userSchema);
