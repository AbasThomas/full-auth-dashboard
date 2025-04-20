import React from "react";
import "../Components/Styles/PaymentPage.css";

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <p>Choose a payment method and complete your order.</p>
      {/* You can implement Paystack, Stripe, or Cash on Delivery here */}
    </div>
  );
};

export default PaymentPage;
