import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // For user context
import { useNavigate } from 'react-router-dom'; // For navigation
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
import '../css/MyBuddies.css'; // For custom styling
import EmptyState from '../components/EmptyState';
const API_URL = process.env.REACT_APP_BACKEND_URL;
const MyBuddies = () => {
  const { user } = useContext(UserContext); // Get logged-in user's details
  const [friends, setFriends] = useState([]); // State to store friends
  const [loading, setLoading] = useState(true); // Spinner state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Navigation hook for profile redirection

  // Added for dialog functionality
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buddyToDelete, setBuddyToDelete] = useState(null);

  // Fetch friends from the backend
  useEffect(() => {
    const fetchMyFriends = async () => {
      try {
        setLoading(true); // Show spinner while loading
        const response = await fetch(
          `${API_URL}/api/friends/my-friends?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json();
        setFriends(data); // Update friends state
      } catch (err) {
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Hide spinner
      }
    };

    fetchMyFriends(); // Call the fetch function on component mount
  }, [user.email]); // Re-fetch if user's email changes

  // Navigate to the dog profile page
  const handleViewProfile = (dogId) => {
    if (dogId) {
      navigate(`/dog-profile/${dogId}`); // Navigate to the dog's profile page
    } else {
      console.error('Dog ID is undefined');
    }
  };

  // Show confirmation dialog for removing a buddy
  const confirmRemoveBuddy = (buddyEmail) => {
    setBuddyToDelete(buddyEmail);
    setDialogOpen(true);
  };

  // Proceed with removing the buddy
  const handleRemoveBuddy = async () => {
    try {
      const response = await fetch(`${API_URL}/api/friends/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email1: user.email, // Logged-in user's email
          email2: buddyToDelete,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setFriends((prev) =>
        prev.filter((friend) => friend.owner.email !== buddyToDelete)
      ); // Remove buddy from state
    } catch (err) {
      console.error('Error removing buddy:', err.message);
      alert('Could not remove the buddy. Please try again.');
    } finally {
      setDialogOpen(false); // Close the dialog
      setBuddyToDelete(null); // Clear the buddyToDelete state
    }
  };

  if (loading) {
    // Render spinner while data is loading
    return (
      <div className="spinner-container">
        <CircularProgress />
        <p>Loading your buddies...</p>
      </div>
    );
  }

  if (error) {
    // Render error message if an error occurs
    return <p className="error-message">Error: {error}</p>;
  }

  if (friends.length === 0) {
    // Render a message if no friends are found
    return <EmptyState message="You don't have any buddies yet!" />;
  }
  return (
    <Box className="my-buddies-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Here are your buddy's buddies
      </Typography>

      {/* Dog List */}
      <Box className="buddies-list">
        {friends.map((dog) => (
          <Box key={dog.id} className="dog-item">
            {/* Dog Image */}
            <Avatar
              src={dog.image || '/data/images/default-dog.jpg'}
              alt={dog.name}
              className="dog-avatar"
              // use sx mui to edit size
              sx={{ width: 130, height: 130 }}
            />
            {/* Dog Details */}
            <Box className="dog-details">
              <Typography variant="h6" className="dog-name">
                {dog.name}
              </Typography>
              <Typography variant="body2" className="dog-city">
                {dog.region}
              </Typography>
            </Box>
            {/* View Profile Button */}
            <Box className="action-buttons">
              <Button
                variant="contained"
                color="primary"
                className="view-profile-btn"
                onClick={() => handleViewProfile(dog.id)}
              >
                View Profile
              </Button>
              <Button
                variant="contained"
                color="error" // Red color for the delete button
                className="delete-buddy-btn"
                onClick={() => confirmRemoveBuddy(dog.owner.email)} // Open confirmation dialog
              >
                Delete Buddy
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this buddy?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            className="dialog-no-button"
          >
            No
          </Button>
          <Button onClick={handleRemoveBuddy} className="dialog-yes-button">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBuddies;
