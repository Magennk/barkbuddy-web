import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render the protected children if user is logged in
  return children;
}

export default ProtectedRoute;
