// backend/models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    customerId: { type: String, required: true, unique: true },
    zone: {type: String, required: true},
    eligibleProducts: {
        type: [String],
        required: true,
    },
    
});

module.exports = mongoose.model('Customer', customerSchema);
