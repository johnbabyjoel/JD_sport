// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const productRoutes = require('./routes/productRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(express.json()); // Parse JSON data
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'JD Sports API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
