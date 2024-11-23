import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../css/Login.css";

const Login = () => {
  const { setUser } = useContext(UserContext); // Access global user state
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [error, setError] = useState(null); // Error message state
  const navigate = useNavigate(); // Navigation hook

  // Handles the form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this block with a Node.js backend API call in the future
      // Example API structure:
      // const response = await fetch("https://api.example.com/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // if (data.success) {
      //   setUser(data.user); // Set logged-in user data
      //   navigate("/"); // Redirect to home
      // } else {
      //   setError(data.message); // Display error from backend
      // }

      // Temporary for testing: Only set dummy user
      if (email === "john.doe@example.com" && password === "123") {
        setUser({ email, name: "John Doe" });
        navigate("/");
      } else {
        setError("Invalid email or password"); // Show error for invalid login
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later."); // Handle network or server errors
    }
  };

  // Handles "Forgot Password" click
  const handleForgotPassword = () => {
    alert("Not available in the current version."); // Placeholder for future feature
  };

  return (
    <Box className="login-container">
      <Paper className="login-card" elevation={3}>
        {/* BarkBuddy Header */}
        <Typography variant="h3" className="login-header">
          BarkBuddy
        </Typography>
        <Typography variant="h5" className="login-title">
          Welcome Back!
        </Typography>
        {/* Error Alert */}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Login
          </Button>
        </form>
        {/* Forgot Password */}
        <Link
          component="button"
          variant="body2"
          onClick={handleForgotPassword}
          className="forgot-password"
        >
          Forgot password?
        </Link>
        {/* Register Link */}
        <Typography className="signup-link" variant="body2">
          Don't have an account?{" "}
          <Link href="/register" className="signup-link-text">
            Sign Up!
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
