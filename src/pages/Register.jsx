import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Alert,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import "../css/Register.css";
import TextField from '@mui/material/TextField';
import FlashOnIcon from "@mui/icons-material/FlashOn";
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
  // City list state
  const [cities, setCities] = useState([]);
  // State for email validation
  const [emailValidation, setEmailValidation] = useState({ isValid: true, message: "" });
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
      energyLevel: 3,
      description: "",
      image: null,
    },
    termsAccepted: false,
  });

  // Energy Level bar
  const renderEnergyLevel = () => {
    const levels = Array.from({ length: 5 }, (_, i) => (
      <FlashOnIcon
        key={i}
        style={{
          color: i < formData.dog.energyLevel ? "gold" : "lightgrey",
          cursor: "pointer",
        }}
        onClick={() =>
          setFormData((prevData) => ({
            ...prevData,
            dog: { ...prevData.dog, energyLevel: i + 1 },
          }))
        }
      />
    ));
    return <Box className="energy-bar">{levels}</Box>;
  };


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

  // Fetch dog breeds for Step 3 using a rest api
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

  // Fetch list of cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities); // Set cities list from response
      } catch (error) {
        console.error("Error fetching cities:", error.message);
        setCities([]); // Default to empty list if fetch fails
      }
    };
    fetchCities();
  }, []);

  // Validate if email of user already exist
  const validateEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/check-email?email=${email}`);
      const data = await response.json();
      if (data.exists) {
        setEmailValidation({ isValid: false, message: "Email is already registered to BarkBuddy, try using another Email." });
      } else {
        setEmailValidation({ isValid: true, message: "" });
      }
    } catch (error) {
      console.error("Error validating email:", error.message);
      setEmailValidation({ isValid: false, message: "Server error. Please try again later." });
    }
  };
  

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
    // step 0 - user and password
    if (activeStep === 0) {
      // Verify email is required
      if (!currentStepData.email) {
        stepErrors.email = "Email is required.";
      }
      // Validate if email is already exist
      if (!emailValidation.isValid) {
        stepErrors.email = emailValidation.message;
      }
      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for a basic email format
      if (!emailRegex.test(currentStepData.email)) {
        stepErrors.email = "Please enter a valid email address.";
      }
      // Verify password is required
      if (!currentStepData.password) {
        stepErrors.password = "Password is required.";
      }
      // Verify password is required
      if (!currentStepData.confirmPassword) {
        stepErrors.confirmPassword = "Confirm Password is required.";
      }
      // verify that password is at least 6 letters
      if (currentStepData.password.length < 6)
        stepErrors.password = "Password must be at least 6 characters.";
      if (currentStepData.password !== currentStepData.confirmPassword)
        stepErrors.confirmPassword = "Passwords do not match.";
    }
    // step 1 - owner information
    else if (activeStep === 1) {
      if (!currentStepData.firstName) {
        stepErrors.firstName = "First Name is required.";
      }
      // verify that name is letters only
      else if (!/^[A-Za-z\s]+$/.test(currentStepData.firstName)) {
        stepErrors.firstName = "First Name must contain only letters.";
      }
      if (!currentStepData.lastName) {
        stepErrors.lastName = "Last Name is required.";
      }
      // verify that name is letters only
      else if (!/^[A-Za-z\s]+$/.test(currentStepData.lastName)) {
        stepErrors.lastName = "Last Name must contain only letters.";
      }
      if (!currentStepData.dob) stepErrors.dob = "Date of Birth is required.";
      if (!currentStepData.gender) stepErrors.gender = "Gender is required.";
      if (!currentStepData.city) {
        stepErrors.city = "City is required.";
      }// else if (!/^[A-Za-z\s]+$/.test(currentStepData.city)) {
        //stepErrors.city = "City must contain only letters.";
      //}
    }
    // step 2 - dog information
    else if (activeStep === 2) {
      if (!currentStepData.name) stepErrors.name = "Dog's Name is required.";
      if (!currentStepData.sex) stepErrors.sex = "Dog's Sex is required.";
      if (!currentStepData.breed) stepErrors.breed = "Breed is required.";
      if (!currentStepData.city) stepErrors.city = "City is required.";
    }
    // step 3 - terms
    else if (activeStep === 3) {
      return <TermsConditions />;
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
             label={
              <>
                Email <span className="required-field">*</span>
              </>
             }
              name="email"
              value={formData.account.email}
              onChange={(e) => {
                  handleChange(e, "account"); 
                  validateEmail(e.target.value); // Validate email
                }}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label={
              <>
                Password <span className="required-field">*</span>
              </>
              }
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
            label={
              <>
                Confirm Password <span className="required-field">*</span>
              </>
              }
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
            label={
              <>
                First Name <span className="required-field">*</span>
              </>
             }
              name="firstName"
              value={formData.owner.firstName}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label={
                <>
                  Last Name <span className="required-field">*</span>
                </>
                }
              name="lastName"
              value={formData.owner.lastName}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label={
                <>
                  Date Of Birth <span className="required-field">*</span>
                </>
                }
              name="dob"
              type="date"
              value={formData.owner.dob}
              onChange={(e) => handleChange(e, "owner")}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <FormControl fullWidth margin="normal" error={!!errors.gender}>
              <InputLabel>Gender <span className="required-field">*</span></InputLabel>
              <Select
                name="gender"
                value={formData.owner.gender}
                onChange={(e) => handleChange(e, "owner")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <FormHelperText>{errors.gender}</FormHelperText>{" "}
              {/* Error message */}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.city}>
              <InputLabel>City <span className="required-field">*</span></InputLabel>
              <Select
                name="city"
                value={formData.owner.city}
                onChange={(e) => handleChange(e, "owner")}
              >
                {cities.length > 0 ? (
            cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No cities available</MenuItem>
          )}
                {/*<MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                <MenuItem value="Rehovot">Rehovot</MenuItem>
                <MenuItem value="Herzeliya">Herzeliya</MenuItem>
                <MenuItem value="Ramat-Gan">Ramat-Gan</MenuItem>
                <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                <MenuItem value="Holon">Holon</MenuItem>*/}
              </Select>
              <FormHelperText>{errors.city}</FormHelperText>{" "}
            </FormControl>
            {/*} Comment by Magen because replace city
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
            */}
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
              label={
                <>
                  Dog Name <span className="required-field">*</span>
                </>
                }
              name="name"
              value={formData.dog.name}
              onChange={(e) => handleChange(e, "dog")}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <FormControl fullWidth margin="normal" error={!!errors.sex}>
              <InputLabel>Sex<span className="required-field">*</span></InputLabel>
              <Select
                name="sex"
                value={formData.dog.sex}
                onChange={(e) => handleChange(e, "dog")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <FormHelperText>{errors.sex}</FormHelperText>{" "}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.city}>
              <InputLabel>City<span className="required-field">*</span></InputLabel>
              <Select
                name="city"
                value={formData.dog.city}
                onChange={(e) => handleChange(e, "dog")}
              >
                {cities.length > 0 ? (
            cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No cities available</MenuItem>
          )}
                {/*<MenuItem value="Tel-Aviv">Tel-Aviv</MenuItem>
                <MenuItem value="Rehovot">Rehovot</MenuItem>
                <MenuItem value="Herzeliya">Herzeliya</MenuItem>
                <MenuItem value="Ramat-Gan">Ramat-Gan</MenuItem>
                <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                <MenuItem value="Holon">Holon</MenuItem>*/}
              </Select>
              <FormHelperText>{errors.city}</FormHelperText>{" "}
            </FormControl>
            {/* Comment By Magen because replace city to dropdown
            <TextField
              label="City"
              name="city"
              value={formData.dog.city}
              onChange={(e) => handleChange(e, "dog")}
              fullWidth
              margin="normal"
              error={!!errors.city}
              helperText={errors.city}
            />
            */}
            <FormControl fullWidth margin="normal" error={!!errors.breed}>
              <InputLabel>Breed<span className="required-field">*</span></InputLabel>
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
              <FormHelperText>{errors.breed}</FormHelperText>{" "}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.energyLevel}>
              <FormLabel className="form-label">Energy Level</FormLabel>
              <Typography>{renderEnergyLevel()}</Typography>
            </FormControl>
            <TextField
              label="Dog Description (Fill free to describe your dog)"
              name="description"
              value={formData.dog.description}
              onChange={(e) => handleChange(e, "dog")}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description}
            />
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
            <TermsConditions />
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
