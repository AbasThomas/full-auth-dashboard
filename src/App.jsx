import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./Components/Navbar";

import DashboardPage from "./Pages/DashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginForm from "./Pages/LoginForm";
import UserRegistrationForm from "./pages/UserRegistration";
import HomePage from "./Pages/HomePage";
import SuperAdminDashboard from "./Pages/admin/SuperAdminDashboard";
import CheckoutPage from './Pages/CheckoutPage';
import { Toaster } from "react-hot-toast";
import CreateProductForm from "./Pages/admin/CreateProductForm";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import ProductPage from "./Pages/ProductPage";
import SingleProductPage from "./Pages/SingleProductPage ";
import DiscountTab from "./Components/Discount";
import HeroSection from "./Components/Hero";
import CartPage from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";

const App = () => {
  return (
    <>
      <Navbar />
      <DiscountTab/>
      {/* <HeroSection/> */}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<ProductPage/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<UserRegistrationForm />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Nested Routes for Super Admin Dashboard */}
        <Route
          path="/superadmin-dashboard/*"
          element={
            <AdminProtectedRoute>
              <SuperAdminDashboard />
            </AdminProtectedRoute>
          }
        >
          <Route path="products" element={<CreateProductForm />} />
        </Route>
          
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
