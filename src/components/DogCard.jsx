import React, { useState } from "react";
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
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"; // Icon for adding a friend
import "../css/DogCard.css"; // CSS for card styling

function DogCard({ dog }) {
  const [openDialog, setOpenDialog] = useState(false); // State for confirmation dialog

  // Function to open the confirmation dialog
  const handleRequestClick = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleDialogClose = (confirm) => {
    if (confirm) {
      console.log(`Friend request sent to ${dog.name}`); // Placeholder for sending request
    }
    setOpenDialog(false);
  };

  return (
    <Card className="dog-card">
      {/* Dog image */}
      <CardMedia
        component="img"
        image={dog.image} // Dog image path
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
            >
              <PersonAddAltIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            color="primary"
            className="view-profile-button"
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
