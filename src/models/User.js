// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    seller: { type: Boolean, default: false }, 
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] 
});

module.exports = mongoose.model('User', userSchema);
