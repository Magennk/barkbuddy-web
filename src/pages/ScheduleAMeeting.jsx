import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom"; // useLocation to access the state
import { useContext } from "react"; // useContext to access the UserContext
import { UserContext } from "../context/UserContext"; // Import UserContext
import "../css/ScheduleAMeeting.css"; // CSS for the page

const ScheduleAMeeting = () => {
  // Receive the buddy name and owner email passed from DogProfile
  const location = useLocation();
  const { buddyName, ownerEmail } = location.state || {}; // Get buddyName and ownerEmail from location state
  const { user } = useContext(UserContext); // Access user context to get logged-in user's email

  const [formData, setFormData] = useState({
    buddyName: buddyName || "",  // Using the state we passed
    date: "",       // Date of the meeting
    time: "",       // Time of the meeting
    location: "",   // Location of the meeting
    subject: "",    // Subject of the meeting
    ownerEmail1: user?.email || "", // Logged-in user's email
    ownerEmail2: ownerEmail || "", // Dog owner's email
  });

  const [openDialog, setOpenDialog] = useState(false); // To control the dialog's visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true); // Show the confirmation dialog
  };

  const handleConfirm = async () => {
    console.log("Payload being sent to the backend:", formData);
    if (
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.subject ||
      !formData.ownerEmail1 ||
      !formData.ownerEmail2
    ) {
      alert("All fields are required. Please fill in all the details.");
      console.error("Missing fields:", formData);
      return; // Stop function execution if fields are missing
    }
    try {
      const response = await fetch("http://localhost:5000/api/meetings/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Meeting scheduled successfully:", result);
      alert("Meeting scheduled successfully!");
      setOpenDialog(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error scheduling meeting:", error.message);
      alert("Failed to schedule the meeting. Please try again.");
    }
  };
  

  const handleCancel = () => {
    setOpenDialog(false); // Close the dialog without submitting
  };

  return (
    <div className="Schedule-A-Meeting">
      <div className="Schedule-A-Meeting-title">
        <Typography variant="h4" className="page-title">Create a Meeting!</Typography>
      </div>

      <form onSubmit={handleSubmit} className="meeting-form">
        <TextField
          label="Buddy Name"
          variant="outlined"
          name="buddyName"
          value={formData.buddyName}
          onChange={handleChange}
          margin="normal"
          disabled
          className="meeting-field"  // Add class for styling
        />

        <TextField
          label="Date"
          type="date"
          variant="outlined"
          name="date"
          value={formData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="meeting-field"  // Add class for styling
        />

        <TextField
          label="Time"
          type="time"
          variant="outlined"
          name="time"
          value={formData.time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="meeting-field"  // Add class for styling
        />

        <TextField
          label="Location"
          variant="outlined"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          className="meeting-field"  // Add class for styling
        />

        <TextField
          label="Subject"
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          margin="normal"
          className="meeting-field"  // Add class for styling
        />

        <Button type="submit" variant="contained" color="primary" className="meeting-button">
          Schedule Meeting
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Are you sure you want to schedule a meeting?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please confirm if you'd like to proceed with scheduling the meeting.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScheduleAMeeting;

