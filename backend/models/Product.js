// Import mongoose
const mongoose = require('mongoose');

// Create Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids'] // Only allow these three categories
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
