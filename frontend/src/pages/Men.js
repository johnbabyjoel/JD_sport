import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Men category products when component loads
  useEffect(() => {
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/category/Men');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching men products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Men's Sports Items</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <p>No men's products available.</p>
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

export default Men;
