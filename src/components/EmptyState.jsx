import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import logo from "../assets/logo.png"; // Update `logo.png` to the actual file name

const EmptyState = ({ message }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: "100px", height: "100px", marginBottom: "20px" }}
      />
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ padding: "10px 20px" }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default EmptyState;
