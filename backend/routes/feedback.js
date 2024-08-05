const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Route to submit feedback
router.post('/submit', async (req, res) => {
    const { customerId, zone, product, responses } = req.body;

    try {
        const newFeedback = new Feedback({ customerId, zone, product, responses });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.log("Error ", error);
        res.status(500).json({ error: 'Error submitting feedback' });
    }
});

router.get('/all-feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
