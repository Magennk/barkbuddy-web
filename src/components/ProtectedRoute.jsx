import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import User Context

/**
 * A higher-order component to protect routes.
 * Redirects to the login page if the user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Retrieve user context
  const location = useLocation(); // Get current location for redirection

  if (!user) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children (protected components) for authenticated users
  return children;
};

export default ProtectedRoute;
