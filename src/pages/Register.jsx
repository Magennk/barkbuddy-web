import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "../css/Register.css";

const Register = () => {
  return (
    <Box className="register-container">
      <Typography variant="h4" className="register-header">
        Sign Up for BarkBuddy
      </Typography>
      <Typography variant="body1">
        Registration is not available in the current version.
      </Typography>
      <Button href="/login" variant="contained" className="register-back">
        Back to Login
      </Button>
    </Box>
  );
};

export default Register;
