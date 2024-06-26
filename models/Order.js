const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    }],
    status: { 
        type: String, 
        default: 'Pending' 
    },
});

module.exports = mongoose.model('Order', orderSchema);
