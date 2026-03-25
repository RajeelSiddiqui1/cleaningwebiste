import { Navigate, useLocation } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../lib/api";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  
  // Check if user is logged in at all
  if (!isAuthenticated()) {
    // Not logged in - redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is admin (role from backend is "Admin")
  const role = getUserRole();
  if (role !== "Admin") {
    // User is logged in but not admin - redirect to home
    return <Navigate to="/" replace />;
  }

  // User is admin - allow access
  return children;
};

export default AdminRoute;