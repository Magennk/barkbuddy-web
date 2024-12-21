import React from "react";
import { Link } from "react-router-dom";
import "../css/ThankYou.css"; // CSS for the Thank You page
import logo from "../assets/logo.png"; // Import the BarkBuddy logo

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <img src={logo} alt="BarkBuddy Logo" className="thankyou-logo" />
        <h1 className="thankyou-header">Thank You for Registering!</h1>
        <p className="thankyou-message">
          Your account has been created successfully. We are excited to have you as part of the BarkBuddy community!
        </p>
        <Link to="/login">
          <button className="thankyou-button">Click Here to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
