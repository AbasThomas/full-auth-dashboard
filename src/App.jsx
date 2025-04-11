import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

import DashboardPage from "./Pages/DashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginForm from "./Pages/LoginForm";
import UserRegistrationForm from "./Pages/UserRegistration";

import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<UserRegistrationForm />} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
