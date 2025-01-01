import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/Login.css';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const { setUser } = useContext(UserContext); // Access global user state
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [error, setError] = useState(null); // Error message state
  const navigate = useNavigate(); // Navigation hook

  // Handles the form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend API for login
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse response JSON
      if (response.ok) {
        setUser(data); // Set logged-in user data in context
        navigate('/'); // Redirect to home
      } else {
        setError(data.message); // Display error from backend
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.'); // Handle network or server errors
    }
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
          onClick={() => alert('Feature not available yet')}
          className="forgot-password"
        >
          Forgot password?
        </Link>
        {/* Register Link */}
        <Typography className="signup-link" variant="body2">
          Don't have an account?{' '}
          <Link
            component="button"
            className="signup-link-text"
            onClick={() => navigate('/register')}
          >
            Sign Up!
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
