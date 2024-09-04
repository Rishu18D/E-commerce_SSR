// salesRoutes.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authMiddleware } = require('../middleware/auth');

// Route for sales page (GET request)
router.get('/', authMiddleware, salesController.getSalesPage);

// Route to handle adding a new sale (POST request)
router.post('/add', authMiddleware, salesController.addSale);

module.exports = router;
