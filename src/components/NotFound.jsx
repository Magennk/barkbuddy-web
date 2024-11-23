import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-message">
        The page you are looking for does not exist.
      </p>
      <button
        className="notfound-button"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
