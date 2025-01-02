import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import '../css/FriendRequests.css';
import EmptyState from '../components/EmptyState';
const API_URL = process.env.REACT_APP_BACKEND_URL;
const FriendRequests = () => {
  const { user } = useContext(UserContext); // Access user context to get logged-in user's email
  const [requests, setRequests] = useState([]); // State to store friend requests
  const [loading, setLoading] = useState(true); // Loading spinner state
  const [error, setError] = useState(null); // Error state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog open state
  const [requestToDelete, setRequestToDelete] = useState(null); // Track which request to delete

  // Fetch friend requests from the backend
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        setLoading(true); // Show spinner while loading
        const response = await fetch(
          `${API_URL}/api/friends/my-friend-requests?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json();
        setRequests(data); // Update state with fetched requests
      } catch (err) {
        setError(err.message); // Capture error message
      } finally {
        setLoading(false); // Hide spinner
      }
    };

    fetchFriendRequests(); // Fetch data on component load
  }, [user.email]); // Re-fetch if user's email changes

  // Handle Confirm action
  const handleConfirm = async (requestEmail) => {
    try {
      const response = await fetch(`${API_URL}/api/friends/accept-request`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderEmail: requestEmail,
          recipientEmail: user.email, // Logged-in user's email
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setRequests((prev) =>
        prev.filter((req) => req.owner.email !== requestEmail)
      ); // Remove request from state
    } catch (err) {
      console.error('Error confirming friend request:', err.message);
      alert('Could not confirm the friend request. Please try again.');
    }
  };

  // Handle Delete action
  const handleDelete = async (requestEmail) => {
    try {
      const response = await fetch(`${API_URL}/api/friends/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email1: user.email, // Logged-in user's email
          email2: requestEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setRequests((prev) =>
        prev.filter((req) => req.owner.email !== requestEmail)
      ); // Remove request from state
    } catch (err) {
      console.error('Error deleting friend request:', err.message);
      alert('Could not delete the friend request. Please try again.');
    }
  };

  const confirmDeleteRequest = (requestEmail) => {
    setRequestToDelete(requestEmail);
    setDialogOpen(true);
  };

  if (loading) {
    // Render spinner while loading data
    return (
      <div className="spinner-container">
        <CircularProgress />
        <p>Loading friend requests...</p>
      </div>
    );
  }

  if (error) {
    // Render error message if fetching data fails
    return <p className="error-message">Error: {error}</p>;
  }

  if (requests.length === 0) {
    // Render message if no friend requests are found
    return <EmptyState message="You have no pending friend requests." />;
  }

  return (
    <Box className="friend-requests-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Friend Requests
      </Typography>

      {/* Friend Requests List */}
      <Box className="requests-list">
        {requests.map((request) => (
          <Box key={request.id} className="request-item">
            {/* Dog Image */}
            <Avatar
              src={request.image || '/data/images/default-dog.jpg'}
              alt={request.name}
              className="dog-avatar"
              sx={{ width: 130, height: 130 }}
            />
            {/* Dog Details */}
            <Box className="dog-details">
              <Typography variant="h6" className="dog-name">
                {request.name}
              </Typography>
              <Typography variant="body2" className="dog-city">
                {request.region}
              </Typography>
            </Box>
            {/* Confirm and Delete Buttons */}
            <Box className="action-buttons">
              <Button
                variant="contained"
                color="success" // Green for Confirm
                className="confirm-btn"
                onClick={() => handleConfirm(request.owner.email)}
                sx={{ marginRight: 1 }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error"
                className="delete-btn"
                onClick={() => confirmDeleteRequest(request.owner.email)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this friend request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            className="dialog-no-button"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleDelete(requestToDelete);
              setDialogOpen(false);
            }}
            className="dialog-yes-button"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FriendRequests;
