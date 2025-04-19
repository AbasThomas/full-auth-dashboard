import React from "react";
import { useCart } from "../contexts/CartContext";
import "../Components/Styles/CartPage.css";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleIncrement = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-heading">
        <FaShoppingCart className="cart-icon" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 😞</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.images[0]} alt={item.name} className="cart-img" />
              <div className="cart-info">
                <h2>{item.name}</h2>
                <p>₦{item.price.toLocaleString()}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrement(item)} className="qty-btn">
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} className="qty-btn">
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₦{total.toLocaleString()}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
