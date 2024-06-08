// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, productController.getAllProducts);
router.get('/add', authMiddleware, productController.getAddProduct);
router.post('/add', authMiddleware, productController.postAddProduct);
router.get('/:id', authMiddleware, productController.getProduct); // Ensure this route is correct
router.post('/:id/delete', authMiddleware, productController.deleteProduct);

module.exports = router;
