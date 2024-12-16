import React, { useState, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // React Router's navigate function
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"; // Icon for adding a friend
import "../css/DogCard.css"; // Import CSS for card styling
import { UserContext } from "../context/UserContext"; // Importing UserContext for user information

function DogCard({ dog, refreshDogs  }) {
    // Ensure refreshDogs is a valid function
    if (!refreshDogs) {
      console.warn("refreshDogs function is not passed as a prop to DogCard.");
    }
  const { user } = useContext(UserContext); // Getting the logged-in user from context
  const [openDialog, setOpenDialog] = useState(false); // State for confirmation dialog
  const [loading, setLoading] = useState(false); // Spinner state while sending request
  const navigate = useNavigate(); // React Router's navigation function

  // Open the confirmation dialog
  const handleRequestClick = () => {
    setOpenDialog(true);
  };

  // Send Friend Request
  const sendFriendRequest = async () => {
    setLoading(true); // Show spinner while processing
    try {
      const response = await fetch("http://localhost:5000/api/friends/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: user.email, // Logged-in user's email
          recipientEmail: dog.email, // Dog owner's email
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert(`Friend request sent successfully to ${dog.name}!`);
      refreshDogs(); // Trigger refresh of dog list
    } catch (err) {
      console.error("Error sending friend request:", err.message);
      alert("Could not send the friend request.");
    } finally {
      setLoading(false); // Hide spinner
      setOpenDialog(false); // Close dialog
    }
  };

  // Close the dialog
  const handleDialogClose = (confirm) => {
    if (confirm) {
      sendFriendRequest(); // Trigger sending the friend request
    } else {
      setOpenDialog(false); // Close the dialog without action
    }
  };

  // Navigate to Dog's Profile Page
  const handleViewProfile = () => {
    navigate(`/dog-profile/${dog.id}`);
  };

  return (
    <Card className="dog-card">
      {/* Dog image */}
      <CardMedia
        component="img"
        image={dog.image}
        alt={`${dog.name}`}
        className="dog-image"
      />

      <CardContent>
        {/* Dog name */}
        <Typography variant="h6" className="dog-name">
          {dog.name}
        </Typography>

        {/* Dog details: Age and Location */}
        <Typography variant="body2" className="dog-details">
          {dog.age} years old, {dog.region}
        </Typography>

        {/* Dog sex as an icon */}
        <Box className="dog-sex">
          {dog.sex === "male" ? (
            <MaleIcon className="male-icon" />
          ) : (
            <FemaleIcon className="female-icon" />
          )}
        </Box>

        {/* Actions: Friend request and view profile */}
        <Box className="dog-card-actions">
          <Tooltip title="Send Friend Request">
            <IconButton
              color="primary"
              onClick={handleRequestClick}
              className="add-friend-icon"
              disabled={loading} // Disable button while sending request
            >
              {loading ? <CircularProgress size={24} /> : <PersonAddAltIcon fontSize="large" />}
            </IconButton>
          </Tooltip>

          {/* Navigate to Dog Profile */}
          <Button
            variant="contained"
            color="primary"
            className="view-profile-button"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        </Box>
      </CardContent>

      {/* Confirmation dialog */}
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Friend Request</DialogTitle>
        <DialogContent>
          Are you sure you want to send a friend request to {dog.name}?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDialogClose(false)}
            className="dialog-cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            className="dialog-confirm-button"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default DogCard;
