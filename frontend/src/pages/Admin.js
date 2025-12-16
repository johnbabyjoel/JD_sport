import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Men'
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all products when component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://jd-sport-rn94.vercel.app/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send file and data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    data.append('image', image);

    try {
      await axios.post('https://jd-sport-rn94.vercel.app/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Product added successfully!');

      // Reset form
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: 'Men'
      });
      setImage(null);

      // Refresh product list
      fetchProducts();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      console.error('Error:', error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setMessage('Product deleted successfully!');
        fetchProducts();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting product.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="page-container">
      <h1>Admin Panel</h1>

      {/* Add Product Form */}
      <div className="admin-form-container">
        <h2>Add New Product</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>

      {/* Product List */}
      <div className="admin-products">
        <h2>All Products ({products.length})</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
