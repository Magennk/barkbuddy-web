import React from "react";
//import Header from "../components/Header";
import { Container, Typography, Box, Button } from "@mui/material";
import "../css/HomePage.css";

function HomePage() {
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
          <Button variant="contained" color="primary" className="cta-button">
            Get Started
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
