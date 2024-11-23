import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { UserContext } from "../context/UserContext"; // Import User Context
import "../css/MyProfile.css";

function MyProfile() {
  // Access the user data from context
  const { user } = useContext(UserContext);

  // State to manage the editable fields
  const [editableUser, setEditableUser] = useState(user);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage the confirmation dialog
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Handle input changes in editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the field name and value
    setEditableUser({ ...editableUser, [name]: value }); // Update the editable user state
  };

  // Open the save confirmation dialog
  const handleSaveChanges = () => {
    setIsDialogOpen(true);
  };

  // Handle dialog confirmation
  const handleDialogClose = (confirm) => {
    if (confirm) {
      console.log("Changes saved:", editableUser); // Replace this with the backend call
    } else {
      setEditableUser(user); // Reset to original user data if "No" is selected
    }
    setIsDialogOpen(false);
    setIsEditing(false);
  };

  // If no user is logged in, return an error message
  if (!user) {
    return (
      <div className="error-container">
        <Typography variant="h5" color="error">
          This page is not valid. Please log in first.
        </Typography>
      </div>
    );
  }

  return (
    <div className="my-profile">
      {/* Page Title */}
      <Typography variant="h3" className="page-title">
        My Profile
      </Typography>

      <div className="profile-container">
        {/* Profile Section */}
        <Card className="profile-card">
          <CardMedia
            component="img"
            image={editableUser.image} // User's profile image
            alt={`${editableUser.firstname} ${editableUser.lastname}`}
            className="profile-image"
          />
          <CardContent>
            <Typography variant="h5" className="section-title">
              User Information
            </Typography>

            {/* Editable Text Fields */}
            <Typography>
              <strong>Full Name:</strong>
            </Typography>
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              value={editableUser.firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              value={editableUser.lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
            <Typography>
              <strong>Email:</strong>
            </Typography>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={editableUser.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Box className="actions-container">
        {!isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Information
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          Are you sure you want to save the changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>No</Button>
          <Button onClick={() => handleDialogClose(true)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyProfile;
