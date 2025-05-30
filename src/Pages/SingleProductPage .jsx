import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useCart } from "../contexts/CartContext";
import "../Components/Styles/SingleProductPage.css";
import { FaPlus, FaMinus, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProductPage = () => {
  const { id } = useParams();
  const { dispatch, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cartItem = cart.find((item) => item._id === id && item.color === selectedColor);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/products/${id}`);
        if (res.data.productFound) {
          setProduct(res.data.productFound);
          setSelectedColor(
            res.data.productFound.colors[0]?.name || ""
          );
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.warning("Please select a color");
      return;
    }

    dispatch({ 
      type: "ADD_TO_CART", 
      payload: { 
        ...product, 
        quantity,
        color: selectedColor 
      } 
    });

    toast.success("Added to cart!");
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: { id: product._id, color: selectedColor } });
    } else {
      setQuantity(prev => Math.min(prev + 1, product.countInStock));
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      dispatch({ type: "DECREMENT_QUANTITY", payload: { id: product._id, color: selectedColor } });
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(Number(rating)) || 0;
    return (
      <div className="single-star-rating">
        {Array.from({ length: 5 }, (_, i) => (
          i < filledStars 
            ? <FaStar key={i} className="single-star filled" /> 
            : <FaRegStar key={i} className="single-star" />
        ))}
      </div>
    );
  };

  if (loading) return <div className="single-loading">Loading product details...</div>;
  if (error) return <div className="single-error">{error}</div>;
  if (!product) return <div className="single-error">Product not found</div>;

  return (
    <div className="single-product-wrapper">
      <div className="single-product-breadcrumb">
        Home / Products / {product.category} / {product.name}
      </div>

      <div className="single-product-content">
        {/* Image Gallery */}
        <div className="single-product-gallery">
          <div className="gallery-thumbnails">
            {product.images?.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="single-product-main-image">
            {product.images?.length > 0 ? (
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="main-image"
              />
            ) : (
              <div className="single-no-image">No image available</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="single-product-info">
          <h1 className="single-product-title">{product.name}</h1>

          <div className="single-product-rating-section">
            {renderStars(Number(product.averageRating))}
            <span className="rating-value">
              {Number(product.averageRating || 0).toFixed(1)}
            </span>
            <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
          </div>

          <p className="single-product-price">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="single-product-description">{product.description}</p>

          <div className="single-product-meta">
            <p className="single-product-brand">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="single-product-category">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="single-product-stock">
              <strong>Availability:</strong>{" "}
              <span className={product.countInStock > 0 ? "in-stock" : "out-of-stock"}>
                {product.countInStock > 0 
                  ? `${product.countInStock} in stock` 
                  : "Out of stock"}
              </span>
            </p>
          </div>

          {/* Color Palette Section */}
          <div className="single-product-colors">
            <strong>Colors:</strong>
            <div className="single-color-palette">
              {product.colors?.length > 0 ? (
                product.colors.map((color) => (
                  <button
                    key={color._id}
                    className={`single-color-btn ${
                      selectedColor === color.name ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.name }}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select color: ${color.name}`}
                  >
                    {selectedColor === color.name && <span className="color-check">✓</span>}
                  </button>
                ))
              ) : (
                <p className="no-colors">No colors available</p>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="single-product-actions">
            <div className="quantity-section">
              <strong>Quantity:</strong>
              <div className="single-quantity-selector">
                <button 
                  onClick={handleDecrement} 
                  disabled={cartItem?.quantity === 1 || quantity === 1}
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span>{cartItem ? cartItem.quantity : quantity}</span>
                <button 
                  onClick={handleIncrement} 
                  disabled={
                    cartItem 
                      ? cartItem.quantity >= product.countInStock
                      : quantity >= product.countInStock
                  }
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {product.countInStock > 0 ? (
              cartItem ? (
                <div className="cart-added-message">
                  <span>Added to cart</span>
                  <button 
                    className="view-cart-btn"
                    onClick={() => window.location.href = "/cart"}
                  >
                    View Cart
                  </button>
                </div>
              ) : (
                <button 
                  className="single-add-to-cart-btn" 
                  onClick={handleAddToCart}
                  disabled={!selectedColor}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              )
            ) : (
              <button className="out-of-stock-btn" disabled>
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-details-tabs">
        <div className="tab active">Description</div>
        <div className="tab">Specifications</div>
        <div className="tab">Reviews ({product.reviews?.length || 0})</div>

        <div className="tab-content">
          <p>{product.description}</p>
          <div className="product-specs">
            {product.specifications?.length > 0 ? (
              <ul>
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <strong>{spec.key}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No specifications available</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products">
        <h2>You may also like</h2>
        <div className="related-products-grid">
          <div className="related-product-card">
            <div className="related-product-image"></div>
            <h3>Related Product</h3>
            <p>₦9,999</p>
          </div>
          <div className="related-product-card">
            <div className="related-product-image"></div>
            <h3>Related Product</h3>
            <p>₦9,999</p>
          </div>
          <div className="related-product-card">
            <div className="related-product-image"></div>
            <h3>Related Product</h3>
            <p>₦9,999</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
