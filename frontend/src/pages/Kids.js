import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Kids() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Kids category products when component loads
  useEffect(() => {
    fetchKidsProducts();
  }, []);

  const fetchKidsProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/category/Kids');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching kids products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Kids' Sports Items</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <p>No kids' products available.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Kids;
