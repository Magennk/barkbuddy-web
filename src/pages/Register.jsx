import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import Step1 from "../components/Step1"; // Step 1 component
import "../css/Register.css"; // Separate CSS file for styling

// Register component managing all steps
const Register = () => {
  const steps = ["Account Details", "Owner Information", "Dog Information"];
  const [activeStep, setActiveStep] = useState(0);

  // Form data for all steps
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Move to the next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Render the content of the current step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            data={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        );
      // Other steps (Step2, Step3) will go here
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box className="register-container">
      <Typography variant="h4" className="register-title">
        Register with BarkBuddy
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel className="stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box className="step-content">{renderStepContent()}</Box>
    </Box>
  );
};

export default Register;
