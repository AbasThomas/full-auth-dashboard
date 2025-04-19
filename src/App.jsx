import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./Components/Navbar";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginForm from "./pages/LoginForm";
import UserRegistrationForm from "./pages/UserRegistration";
import HomePage from "./pages/HomePage";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";

import { Toaster } from "react-hot-toast";
import CreateProductForm from "./pages/admin/CreateProductForm";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import ProductPage from "./Pages/ProductPage";
import SingleProductPage from "./Pages/SingleProductPage ";
import DiscountTab from "./Components/Discount";
import HeroSection from "./Components/Hero";
import CartPage from "./Pages/CartPage";

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
