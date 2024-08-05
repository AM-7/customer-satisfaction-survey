// backend/routes/authRoutes.js
const express = require('express');
const { customerLogin, adminLogin, eligibleProducts } = require('../controllers/authController');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/customer-login', customerLogin);
router.post('/admin-login', adminLogin);
router.post('/eligible-products', eligibleProducts), 
module.exports = router;
