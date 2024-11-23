import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import "../css/Register.css";
import TermsConditions from "../components/TermsConditions"; // Import the new TermsConditions component

// Steps titles
const steps = [
  "Account Information",
  "Owner Information",
  "Dog Information",
  "Terms & Conditions",
];

const Register = () => {
  // Track active step
  const [activeStep, setActiveStep] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    account: { email: "", password: "", confirmPassword: "" },
    owner: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      city: "",
      image: null,
    },
    dog: {
      name: "",
      sex: "",
      city: "",
      dob: "",
      breed: "",
      vaccinated: "",
      goodWithKids: "",
      goodWithAnimals: "",
      restrictedBreed: "",
      energyLevel: 1,
      about: "",
      image: null,
    },
    termsAccepted: false,
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Snackbar state
  const [alert, setAlert] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  // Dog breeds state
  const [breeds, setBreeds] = useState([]);

  // Fetch dog breeds for Step 3
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setBreeds(Object.keys(data.message)); // Extract breed names
        }
      })
      .catch((error) => {
        console.error("Error fetching dog breeds:", error);
        setBreeds([]);
      });
  }, []);

  // Validate current step
  const validateStep = () => {
    const stepErrors = {};
    const currentStepData =
      activeStep === 0
        ? formData.account
        : activeStep === 1
        ? formData.owner
        : activeStep === 2
        ? formData.dog
        : formData.termsAccepted;

    // Step-wise validation
    if (activeStep === 0) {
      if (!currentStepData.email.includes("@"))
        stepErrors.email = "Please enter a valid email address.";
      if (currentStepData.password.length < 6)
        stepErrors.password = "Password must be at least 6 characters.";
      if (currentStepData.password !== currentStepData.confirmPassword)
        stepErrors.confirmPassword = "Passwords do not match.";
    } else if (activeStep === 1) {
      if (!currentStepData.firstName)
        stepErrors.firstName = "First Name is required.";
      if (!currentStepData.lastName)
        stepErrors.lastName = "Last Name is required.";
      if (!currentStepData.city) stepErrors.city = "City is required.";
    } else if (activeStep === 2) {
      if (!currentStepData.name) stepErrors.name = "Dog's Name is required.";
      if (!currentStepData.breed) stepErrors.breed = "Breed is required.";
      if (!currentStepData.city) stepErrors.city = "City is required.";
    } else if (activeStep === 3) {
      return <TermsConditions />; // Render the TermsConditions component in Step 4
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Handle Next button
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 1) {
        // Pre-fill dog's city with owner's city
        setFormData((prev) => ({
          ...prev,
          dog: { ...prev.dog, city: prev.owner.city },
        }));
      }
      setActiveStep((prev) => prev + 1);
    } else {
      setAlert({
        open: true,
        severity: "error",
        message: "Please fix the errors before proceeding.",
      });
    }
  };

  // Handle Back button
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form input changes
  const handleChange = (e, stepKey) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: { ...prevData[stepKey], [name]: value },
    }));
  };

  // Handle file upload
  const handleFileUpload = (e, stepKey) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setFormData((prevData) => ({
        ...prevData,
        [stepKey]: { ...prevData[stepKey], image: file },
      }));
    } else {
      setAlert({
        open: true,
        severity: "error",
        message: "Only JPEG files are allowed.",
      });
    }
  };

  // Render step content dynamically
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Account Information
        return (
          <Box className="step-content">
            <Typography variant="h6">Account Information</Typography>
            <TextField
              label="Email"
              name="email"
              value={formData.account.email}
              onChange={(e) => handleChange(e, "account")}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.account.password}
              onChange={(e) => handleChange(e, "account")}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.account.confirmPassword}
              onChange={(e) => handleChange(e, "account")}
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Box>
        );
      case 1: // Owner Information
        return (
          <Box className="step-content">
            <Typography variant="h6">Owner Information</Typography>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.owner.firstName}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.owner.lastName}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.owner.dob}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.owner.gender}
                onChange={(e) => handleChange(e, "owner")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="City"
              name="city"
              value={formData.owner.city}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              error={!!errors.city}
              helperText={errors.city}
            />
            <Button variant="contained" component="label" fullWidth>
              Upload Profile Picture
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload(e, "owner")}
              />
            </Button>
          </Box>
        );
      case 2: // Dog Information
        return (
          <Box className="step-content">
            <Typography variant="h6">Dog Information</Typography>
            <TextField
              label="Dog Name"
              name="name"
              value={formData.dog.name}
              onChange={(e) => handleChange(e, "dog")}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Sex</InputLabel>
              <Select
                name="sex"
                value={formData.dog.sex}
                onChange={(e) => handleChange(e, "dog")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="City"
              name="city"
              value={formData.dog.city}
              onChange={(e) => handleChange(e, "dog")}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Breed</InputLabel>
              <Select
                name="breed"
                value={formData.dog.breed}
                onChange={(e) => handleChange(e, "dog")}
              >
                {breeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" component="label" fullWidth>
              Upload Dog Picture
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload(e, "dog")}
              />
            </Button>
          </Box>
        );
      case 3: // Terms & Conditions
        return (
          <Box className="step-content">
            <Typography variant="h6">Terms & Conditions</Typography>
            <Typography variant="body2" className="terms-text">
              By registering, you agree to the following terms and conditions...
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAccepted: e.target.checked,
                    })
                  }
                />
              }
              label="I agree to the terms and conditions"
            />
            {errors.termsAccepted && (
              <Typography className="error-text">
                {errors.termsAccepted}
              </Typography>
            )}
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box className="register-container">
      <Typography variant="h4" align="center" className="register-header">
        BarkBuddy Registration
      </Typography>
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent()}
      <Box className="button-group">
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              setAlert({
                open: true,
                severity: "success",
                message: "Registration Complete!",
              })
            }
            disabled={!formData.termsAccepted} // Disable if terms are not accepted
          >
            Finish
          </Button>
        )}
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
