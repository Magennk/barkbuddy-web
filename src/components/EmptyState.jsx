import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import logo from '../assets/logo.png';
import '../css/EmptyState.css'; // Importing the separated CSS file

const EmptyState = ({ message }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box className="empty-state-container">
      <img src={logo} alt="Logo" className="empty-state-logo" />
      <Typography variant="h5" className="empty-state-message">
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        className="empty-state-button"
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default EmptyState;
