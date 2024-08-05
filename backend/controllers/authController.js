// backend/controllers/authController.js
const Customer = require('../models/Customer');

exports.customerLogin = async (req, res) => {
    const { customerName, customerId } = req.body;
    try {
        const customer = await Customer.findOne({ name: customerName,customerId: customerId });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid customer name or ID' });
        }
        res.status(200).json({ message: 'Login successful', customerId: customer.customerId, zone: customer.zone });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in customer' });
    }
};

exports.adminLogin = (req, res) => {
    const { adminUsername, adminPassword } = req.body;
    if (adminUsername === 'admin' && adminPassword === 'admin@4321!') {
        res.status(200).json({ message: 'Admin authenticated successfully' });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

exports.eligibleProducts = async (req, res) => {
    const {customerId} = req.body;
    try {
        const customer = await Customer.findOne({customerId: customerId});
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }else{
            res.status(200).json(customer.eligibleProducts);
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching eligible products' });
    }
};
