import React from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import "../css/Step1.css"; // Separate CSS file for styling

// Step1 component for account details
const Step1 = ({ data, handleChange, handleNext }) => {
  const { email, password, confirmPassword } = data;

  // Function to validate fields
  const validateFields = () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required!");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Proceed to the next step
  const onNext = () => {
    if (validateFields()) {
      handleNext();
    }
  };

  return (
    <Box className="step1-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            helperText="Enter a valid email address"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            helperText="Password must be at least 6 characters"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            helperText="Re-enter your password"
          />
        </Grid>
      </Grid>

      <Box className="step1-navigation">
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          className="next-btn"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step1;
