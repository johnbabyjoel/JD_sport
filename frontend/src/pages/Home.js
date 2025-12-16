import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>JD SPORTS</h1>
          <p>Shop the Latest Collection</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Authentic</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="content-wrapper">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐⭐⭐</div>
              <h3>Best Quality</h3>
              <p>Premium sports gear</p>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="content-wrapper">
          <h2 className="section-heading">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-box">
              <h3>Men</h3>
              <p>Latest men's collection</p>
              <a href="/men" className="category-link">
                Shop Now →
              </a>
            </div>
            <div className="category-box">
              <h3>Women</h3>
              <p>Latest women's collection</p>
              <a href="/women" className="category-link">
                Shop Now →
              </a>
            </div>
            <div className="category-box">
              <h3>Kids</h3>
              <p>Latest kids' collection</p>
              <a href="/kids" className="category-link">
                Shop Now →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="products-container">
            <div className="products-header">
              <h2>All Products</h2>
              <span className="product-count">{products.length} items</span>
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <div className="content-wrapper">
          <div className="info-grid">
            <div className="info-block">
              <h3>Why Choose JD Sports?</h3>
              <p>
                We bring you the latest and greatest in sports fashion. From
                performance gear to lifestyle wear, we've got everything you
                need to stay ahead of the game.
              </p>
            </div>
            <div className="info-block">
              <h3>Premium Brands</h3>
              <p>
                Shop from top brands in the industry. All products are 100%
                authentic and come with official warranties.
              </p>
            </div>
            <div className="info-block">
              <h3>Fast Delivery</h3>
              <p>
                Get your orders delivered quickly and safely. We offer express
                shipping options for urgent orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
