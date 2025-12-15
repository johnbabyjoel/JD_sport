// Import required packages
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Save images in uploads folder
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Find all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }); // Find products by category
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST - Create new product (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    // Create new product object
    const product = new Product({
      name,
      image: req.file ? `/uploads/${req.file.filename}` : '', // Save image path
      price: Number(price),
      stock: Number(stock),
      category
    });

    // Save to database
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT - Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    // Create update object
    const updateData = {
      name,
      price: Number(price),
      stock: Number(stock),
      category
    };

    // If new image uploaded, update image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Find and update product
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return updated product
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
