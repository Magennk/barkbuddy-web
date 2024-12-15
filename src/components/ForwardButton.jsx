import React, { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { NavigationContext } from "../context/NavigationContext"; // Create this context

const ForwardButton = () => {
  const { forwardRoute } = useContext(NavigationContext); // Access forward route
  const navigate = useNavigate();

  const handleForward = () => {
    if (forwardRoute) {
      navigate(forwardRoute); // Navigate to the forward route
    }
  };

  return (
    <Tooltip title="Go Forward">
      <IconButton color="inherit" onClick={handleForward} disabled={!forwardRoute}>
        <ArrowForwardIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ForwardButton;
