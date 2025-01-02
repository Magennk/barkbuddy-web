import React, { useState, useContext } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import '../css/DogCard.css';
import { UserContext } from '../context/UserContext';
const API_URL = process.env.REACT_APP_BACKEND_URL;
function DogCard({ dog, refreshDogs }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshPending, setRefreshPending] = useState(false); // Track if refresh is pending

  const handleRequestClick = () => {
    setDialogMessage(
      `Are you sure you want to send a friend request to ${dog.name}?`
    );
    setConfirmDialogOpen(true);
  };

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/friends/send-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderEmail: user.email,
          recipientEmail: dog.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setDialogMessage(`Friend request sent successfully to ${dog.name}!`);
      setRefreshPending(true); // Mark refresh as pending
    } catch (err) {
      console.error('Error sending friend request:', err.message);
      setDialogMessage('Could not send the friend request.');
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false); // Close the confirmation dialog
      setResultDialogOpen(true); // Open the result dialog
    }
  };

  const handleConfirmDialogClose = (confirm) => {
    if (confirm) {
      sendFriendRequest();
    } else {
      setConfirmDialogOpen(false);
    }
  };

  const handleResultDialogClose = () => {
    setResultDialogOpen(false);
    if (refreshPending) {
      refreshDogs(); // Refresh the dogs only after result dialog closes
      setRefreshPending(false); // Reset pending refresh state
    }
  };

  const handleViewProfile = () => {
    navigate(`/dog-profile/${dog.id}`);
  };

  return (
    <Card className="dog-card">
      <CardMedia
        component="img"
        image={dog.image}
        alt={`${dog.name}`}
        className="dog-image"
      />
      <CardContent>
        <Typography variant="h6" className="dog-name">
          {dog.name}
        </Typography>
        <Typography variant="body2" className="dog-details">
          {dog.age} years old, {dog.region}
        </Typography>
        <Box className="dog-sex">
          {dog.sex === 'male' ? (
            <MaleIcon className="male-icon" />
          ) : (
            <FemaleIcon className="female-icon" />
          )}
        </Box>
        <Box className="dog-card-actions">
          <Tooltip title="Send Friend Request">
            <IconButton
              color="primary"
              onClick={handleRequestClick}
              className="add-friend-icon"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <PersonAddAltIcon fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
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

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>Confirm Friend Request</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmDialogClose(false)}
            className="dialog-cancel-button"
          >
            Cancel
          </Button>
          <Button
            className="dialog-confirm-button"
            onClick={() => handleConfirmDialogClose(true)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={resultDialogOpen} onClose={handleResultDialogClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResultDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default DogCard;
