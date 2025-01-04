import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../css/HomePage.css";
import backgroundImage from '../assets/background.png';

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGetStarted = () => {
    navigate('/meet-buddies'); // Navigate to the MeetNewBuddies page
  };

  return (
    <div>
      <Container className="homepage-container">
        <Box className="welcome-section">
          <Typography variant="h2" className="welcome-text">
            Welcome to BarkBuddy!
          </Typography>
          <Typography variant="h6" className="subtext">
            Your one-stop solution to meet and connect with fellow dog lovers.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            className="cta-button" 
            onClick={handleGetStarted} // Trigger navigation on button click
          >
            Get Started
          </Button>
        </Box>
        <img src={backgroundImage} alt="Dogs" className="homepage-image" />
      </Container>
    </div>
  );
}

export default HomePage;

