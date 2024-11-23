import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css"; // Separate CSS file for Not Found styles

const NotFound = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="back-button" onClick={() => navigate("/")}>
        Go Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
