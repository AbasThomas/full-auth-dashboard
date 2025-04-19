import React from "react";
import "./Styles/hero.css"; // Make sure this path matches your file structure

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Premium <br /> Products for Modern Living
        </h1>
        <p className="hero-subtext">
          Shop the latest trends with confidence. Premium quality, competitive
          prices, and exceptional service.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Shop Now</button>
          <button className="btn-secondary">Explore Collections</button>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;
