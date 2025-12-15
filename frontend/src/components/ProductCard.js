import React from 'react';

// ProductCard component to display individual product
function ProductCard({ product }) {
  const API_URL = 'http://localhost:5000';

  return (
    <div className="product-card">
      <img
        src={`${API_URL}${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <p className="stock">Stock: {product.stock}</p>
        <p className="category">{product.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;
