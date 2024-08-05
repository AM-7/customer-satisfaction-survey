const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    zone: {type: String, required: true},
    product: { type: String, required: true },
    responses: { type: [Number], required: true } // Array of responses
});

module.exports = mongoose.model('Feedback', feedbackSchema);
