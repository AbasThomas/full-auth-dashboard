import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../Components/Styles/ProductPage.css";
import { useCart } from "../contexts/CartContext";

const renderStars = (rating) => {
  const filledStars = Math.round(Number(rating)) || 0;
  const totalStars = 5;
  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, i) => (
        <span key={i} className={i < filledStars ? "star filled" : "star"}>★</span>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products/");
        if (response.data.status === "success") {
          setProducts(response.data.products);
        } else {
          setError("No products found");
        }
      } catch (err) {
        setError("Error fetching products data");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopNest</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/products")}>
              Shop Now
            </button>
            <button className="btn-outline" onClick={() => window.scrollTo({ top: document.querySelector('.features-section').offsetTop, behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over ₦50,000</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">↩️</div>
          <h3>30-Day Returns</h3>
          <p>No questions asked</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% protected transactions</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <button className="view-all-btn" onClick={() => navigate("/products")}>
            View All Products
          </button>
        </div>
        <div className="product-list">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => navigate(`/products/${product._id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/products/${product._id}`);
              }}
            >
              <div className="product-image">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="no-image">No image available</div>
                )}
              </div>
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">₦{product.price.toLocaleString()}</p>
                <div className="product-rating">{renderStars(product.averageRating)}</div>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'ADD_TO_CART', payload: product });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="testimonial-content">
              "The quality of products exceeded my expectations. Fast shipping too!"
            </div>
            <div className="testimonial-author">- Chinedu O.</div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              "Best customer service I've experienced. Will definitely shop again!"
            </div>
            <div className="testimonial-author">- Amina K.</div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive deals and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button
        className="floating-cart-btn"
        onClick={() => navigate("/cart")}
      >
        🛒 Go to Cart
      </button>
    </div>
  );
};

export default HomePage;