import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../Components/Styles/ProductPage.css";
import { useCart } from "../contexts/CartContext";
import '../Components/Styles/product.css';

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

const Product = () => {
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

  return (
    <div className="product-page">
      <h1 className="page-title">Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
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
      {/* 👉 Floating Cart Button */}
    <button
      className="floating-cart-btn"
      onClick={() => navigate("/cart")}
    >
      🛒 Go to Cart
    </button>
    </div>
  );
};

export default Product;