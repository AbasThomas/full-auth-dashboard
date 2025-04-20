import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useCart } from "../contexts/CartContext";
import "../Components/Styles/SingleProductPage.css";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const renderStars = (rating) => {
  const filledStars = Math.round(Number(rating)) || 0;
  const totalStars = 5;
  return (
    <div className="single-star-rating">
      {Array.from({ length: totalStars }, (_, i) => (
        <span key={i} className={i < filledStars ? "single-star filled" : "single-star"}>
          ★
        </span>
      ))}
    </div>
  );
};

const SingleProductPage = () => {
  const { id } = useParams();
  const { dispatch, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color

  const cartItem = cart.find((item) => item._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiClient.get(`/products/${id}`);
        setProduct(res.data.productFound);
        setSelectedColor(res.data.productFound.colors[0]?.name || ""); // Default to the first color
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1, color: selectedColor } });
  };

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product._id });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product._id });
  };

  if (loading) return <p className="single-loading">Loading...</p>;
  if (!product) return <p className="single-error">No product details available.</p>;

  return (
    <div className="single-product-wrapper">
      <h1 className="single-product-title">{product.name}</h1>
      <div className="single-product-content">
        <div className="single-product-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="single-no-image">No image available</div>
          )}
        </div>

        <div className="single-product-info">
          <p className="single-product-description">{product.description}</p>
          <p className="single-product-price">
            <strong>Price:</strong> ₦{product.price.toLocaleString()}
          </p>
          <p className="single-product-brand">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="single-product-category">
            <strong>Category:</strong> {product.category}
          </p>
          <div className="single-product-rating">
            <strong>Rating:</strong>{" "}
            {renderStars(isNaN(product.averageRating) ? 0 : product.averageRating)}
          </div>

          {/* Color Palette Section */}
          <div className="single-product-colors">
            <strong>Available Colors:</strong>
            <div className="single-color-palette">
              {product.colors.map((color) => (
                <button
                  key={color._id}
                  className={`single-color-btn ${
                    selectedColor === color.name ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.name }}
                  onClick={() => setSelectedColor(color.name)}
                >
                  {selectedColor === color.name && <span className="color-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {cartItem ? (
            <div className="single-quantity-selector">
              <button onClick={handleDecrement}><FaMinus /></button>
              <span>{cartItem.quantity}</span>
              <button onClick={handleIncrement}><FaPlus /></button>
            </div>
          ) : (
            <button className="single-add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
