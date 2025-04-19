import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // optional if you have global styles
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
    <CartProvider>
       <App />
    </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
