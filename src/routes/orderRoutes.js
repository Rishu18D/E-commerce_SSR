const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

// Routes with authentication middleware
router.post('/create', authMiddleware, orderController.createOrder);
router.get('/summary', authMiddleware, orderController.renderOrderSummaryPage);
router.post('/summary', authMiddleware, orderController.processOrderSummary); // New POST route for handling summary

router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrder);
router.post('/:id/complete', authMiddleware, orderController.completeOrder);
router.post('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;
