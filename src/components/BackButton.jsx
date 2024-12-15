// BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <IconButton onClick={handleBack} aria-label="Go back" style={{ color: "#1976d2" }}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
