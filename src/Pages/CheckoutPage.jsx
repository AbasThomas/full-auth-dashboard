import React from 'react';
import '../Components/Styles/CheckoutPage.css';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();


  const { cart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate("/payment");

    // You could send this to your backend here
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">

        {/* Shipping Info */}
        <div className="checkout-section shipping">
          <h3>Shipping Information</h3>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Postal Code" required />
            <input type="text" placeholder="Country" required />
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-section summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} className="summary-item">
              <span>{item.name} x{item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <strong>Total:</strong> ₦{totalAmount.toLocaleString()}
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
