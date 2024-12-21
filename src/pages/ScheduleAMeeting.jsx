import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../css/ScheduleAMeeting.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ScheduleAMeeting = () => {
  const location = useLocation();
  const { buddyName, ownerEmail } = location.state || {};
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoToMyMeetings = () => {
    navigate("/my-meetings"); // Navigate to the "My Meetings" page
  };

  const [formData, setFormData] = useState({
    buddyName: buddyName || "",
    date: "",
    time: "",
    location: "",
    subject: "",
    ownerEmail1: user?.email || "",
    ownerEmail2: ownerEmail || "",
  });

  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear error when field is edited
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setOpenDialog(true);
    setSuccessMessage(""); // Reset success message when dialog is reopened
  };

  const handleConfirm = async () => {
    console.log("Payload being sent to the backend:", formData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/meetings/schedule-meeting",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Meeting scheduled successfully:", result);
      setSuccessMessage("Meeting scheduled successfully!"); // Update success message
    } catch (error) {
      console.error("Error scheduling meeting:", error.message);
      setSuccessMessage("Failed to schedule the meeting. Please try again."); // Handle error
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setSuccessMessage(""); // Clear success message when dialog is closed
  };

  return (
    <div className="Schedule-A-Meeting">
      <div className="Schedule-A-Meeting-title">
        <Typography variant="h4" className="page-title">
          Create a Meeting!
        </Typography>
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
          className="meeting-field"
        />
        <TextField
          label="Date *"
          type="date"
          variant="outlined"
          name="date"
          value={formData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className={`meeting-field ${errors.date ? "error-field" : ""}`}
          helperText={errors.date}
        />
        <TextField
          label="Time *"
          type="time"
          variant="outlined"
          name="time"
          value={formData.time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className={`meeting-field ${errors.time ? "error-field" : ""}`}
          helperText={errors.time}
        />
        <TextField
          label="Location *"
          variant="outlined"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          className={`meeting-field ${errors.location ? "error-field" : ""}`}
          helperText={errors.location}
        />
        <TextField
          label="Subject *"
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          margin="normal"
          className={`meeting-field ${errors.subject ? "error-field" : ""}`}
          helperText={errors.subject}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="meeting-button"
        >
          Schedule Meeting
        </Button>
        <Button
    variant="contained"
    style={{ backgroundColor: "red", color: "white" }}
    className="meeting-button"
    onClick={() => navigate("/meet-buddies")}
  >
    Go Back to "Meet Buddies"
  </Button>
      </form>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>
          {successMessage || "Are you sure you want to schedule a meeting?"}
        </DialogTitle>
        <DialogContent>
          {successMessage ? (
            <Typography variant="body1">{successMessage}</Typography>
          ) : (
            <Typography variant="body1">
              Please confirm if you'd like to proceed with scheduling the meeting.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!successMessage && (
            <>
              <Button onClick={handleCancel} color="primary">
                No
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Yes
              </Button>
            </>
          )}
          {successMessage && (
           <Button onClick={handleGoToMyMeetings} color="primary">
           Go to "My Meetings"
         </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScheduleAMeeting;


