import React from 'react';
import './Styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="nav-container">
      <div className="navbar-left">
        <div className="logo" onClick={() => navigate('/')}>logo</div>
        <ul className="nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/shop')}>Shop</li>
          <li onClick={() => navigate('/categories')}>Categories</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search products..." />
        </div>

        <FaHeart className="icon" />

        <div className="cart-icon" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        {/* Auth Section */}
        {user ? (
          <>
            <span className="welcome-text">Hi, {user.fullName || "User"}</span>
            <button className="btn logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn sign-in" onClick={() => navigate('/login')}>Sign In</button>
            <button className="btn sign-up" onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
