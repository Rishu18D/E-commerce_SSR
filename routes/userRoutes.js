// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth'); // Destructuring to correctly import authMiddleware

// Routes with authentication middleware
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/profile', authMiddleware, userController.updateProfile);

module.exports = router;
