// routes/shopRoutes.js

const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { authMiddleware } = require('../middleware/auth');

// Route to render the shop page with authentication middleware if needed
router.get('/', authMiddleware, shopController.getShopPage);

module.exports = router;
