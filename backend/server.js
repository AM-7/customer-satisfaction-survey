// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
