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
        enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
