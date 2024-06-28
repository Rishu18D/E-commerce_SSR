const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, cartController.getCart);
router.post('/add/:productId', authMiddleware, cartController.addToCart);
router.post('/:itemId/remove', authMiddleware, cartController.removeFromCart);
router.post('/order', authMiddleware, cartController.orderProducts);

module.exports = router;
