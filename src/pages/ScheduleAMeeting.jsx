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

const ScheduleAMeeting = () => {
  const location = useLocation();
  const { buddyName, ownerEmail } = location.state || {};
  const { user } = useContext(UserContext); 

  const [formData, setFormData] = useState({
    buddyName: buddyName || "",
    date: "",
    time: "",
    location: "",
    subject: "",
    ownerEmail1: user?.email || "",
    ownerEmail2: ownerEmail || "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
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
      return;
    }

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
      alert("Meeting scheduled successfully!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error.message);
      alert("Failed to schedule the meeting. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
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
          label={
            <>
              Date <span className="required-field">*</span>
            </>
          }
          type="date"
          variant="outlined"
          name="date"
          value={formData.date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="meeting-field"
          required
        />

        <TextField
          label={
            <>
              Time <span className="required-field">*</span>
            </>
          }
          type="time"
          variant="outlined"
          name="time"
          value={formData.time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className="meeting-field"
          required
        />

        <TextField
          label={
            <>
              Location <span className="required-field">*</span>
            </>
          }
          variant="outlined"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          className="meeting-field"
          required
        />

        <TextField
          label={
            <>
              Subject <span className="required-field">*</span>
            </>
          }
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          margin="normal"
          className="meeting-field"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="meeting-button"
        >
          Schedule Meeting
        </Button>
      </form>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>
          Are you sure you want to schedule a meeting?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please confirm if you'd like to proceed with scheduling the meeting.
          </Typography>
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
