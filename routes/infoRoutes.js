// routes/infoRoutes.js

const express = require('express');
const router = express.Router();

// Route to render the aboutUs page
router.get('/aboutUs', (req, res) => {
    res.render('aboutUs'); 
});

module.exports = router;
