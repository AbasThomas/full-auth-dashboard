import React from 'react';
import './Styles/DiscountTab.css';
import { FaBolt, FaTags, FaTruck } from 'react-icons/fa';

const DiscountTab = () => {
  return (
    <div className="discount-tab">
      <div className="left-section">
        <div className="deal-item">
          <FaBolt className="deal-icon" />
          <span>Flash Deals</span>
        </div>
        <div className="deal-item">
          <FaTags className="deal-icon" />
          <span>Extra 15% Off</span>
        </div>
        <div className="deal-item">
          <FaTruck className="deal-icon" />
          <span>Free Shipping</span>
        </div>
      </div>

      <div className="right-section">
        <span className="ends-text">Ends in:</span>
        <div className="timer-box">12</div>
        <div>:</div>
        <div className="timer-box">45</div>
        <div>:</div>
        <div className="timer-box">30</div>
        <button className="view-deals-btn">View All Deals</button>
      </div>
    </div>
  );
};

export default DiscountTab;
