import React, { useState } from 'react';
import '../Components/Styles/DummyPayment.css'; // Adjust the path as necessary
import {
  FaCcVisa,
  FaCcMastercard,
  FaUniversity,
  FaPaypal
} from 'react-icons/fa';

const Payment = () => {
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setCard(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="payment-wrapper">
      <h1 className="payment-title">Checkout</h1>

      <div className="tabs">
        <button
          className={method === 'card' ? 'active' : ''}
          onClick={() => setMethod('card')}
        >
          <FaCcVisa /> Card
        </button>
        <button
          className={method === 'bank' ? 'active' : ''}
          onClick={() => setMethod('bank')}
        >
          <FaUniversity /> Bank
        </button>
        <button
          className={method === 'paypal' ? 'active' : ''}
          onClick={() => setMethod('paypal')}
        >
          <FaPaypal /> PayPal
        </button>
      </div>

      <div className="content">
        {/* Preview / Info */}
        {method === 'card' && (
          <div className="card-preview">
            <div className="chip" />
            <div className="number">
              {card.number.padEnd(16, '•').replace(/(.{4})/g, '$1 ')}
            </div>
            <div className="footer">
              <div>
                <small>Card Holder</small>
                <p>{card.name || 'FULL NAME'}</p>
              </div>
              <div>
                <small>Expires</small>
                <p>{card.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        )}
        {method === 'bank' && (
          <div className="info-box">
            <h2>Bank Transfer</h2>
            <p><strong>Bank:</strong> Dummy Bank Ltd.</p>
            <p><strong>Account #:</strong> 1234 5678 9012</p>
            <p><strong>Name:</strong> Thomas Abas</p>
          </div>
        )}
        {method === 'paypal' && (
          <div className="info-box">
            <h2>PayPal</h2>
            <p>You’ll be redirected to PayPal to complete payment.</p>
          </div>
        )}

        {/* Form */}
        <form className="form" onSubmit={e => e.preventDefault()}>
          {method === 'card' && (
            <>
              <label>Cardholder Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={card.name}
                onChange={onChange}
                required
              />

              <label>Card Number</label>
              <input
                type="text"
                name="number"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                value={card.number}
                onChange={onChange}
                required
              />

              <div className="row">
                <div>
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={card.expiry}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="•••"
                    maxLength="3"
                    value={card.cvv}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {method === 'bank' && (
            <>
              <label>Your Full Name</label>
              <input type="text" placeholder="Full Name" required />

              <label>Reference</label>
              <input type="text" placeholder="e.g. Invoice #1234" required />
            </>
          )}

          {method === 'paypal' && (
            <p className="note">Click “Proceed” to continue with PayPal.</p>
          )}

          <button type="submit" className="btn-payment">
            {method === 'card' && 'Pay Now'}
            {method === 'bank' && 'Confirm Transfer'}
            {method === 'paypal' && 'Proceed to PayPal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
