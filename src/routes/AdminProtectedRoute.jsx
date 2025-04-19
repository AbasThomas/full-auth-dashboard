import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // I Check if the user is authenticated and has admin privileges
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
