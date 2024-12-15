import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Access logged-in user's details
import { Box, Typography, Button, Avatar, CircularProgress } from "@mui/material";
import "../css/FriendRequests.css"; // Dedicated CSS file for styling

const FriendRequests = () => {
  const { user } = useContext(UserContext); // Access user context to get logged-in user's email
  const [requests, setRequests] = useState([]); // State to store friend requests
  const [loading, setLoading] = useState(true); // Loading spinner state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Navigation to dog profile page

  // Fetch friend requests from the backend
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        setLoading(true); // Show spinner while loading
        const response = await fetch(`http://localhost:5000/api/friends/my-friend-requests?email=${user.email}`);
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

  // Navigate to the dog profile page
  const handleViewProfile = (dogId) => {
    if (dogId) {
      navigate(`/dog-profile/${dogId}`); // Navigate to the dog's profile
    } else {
      console.error("Dog ID is undefined");
    }
  };

 // Handle Confirm action
const handleConfirm = async (requestEmail) => {
  try {
    const response = await fetch("http://localhost:5000/api/friends/accept-request", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: requestEmail,
        recipientEmail: user.email, // Logged-in user's email
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    setRequests((prev) => prev.filter((req) => req.owner.email !== requestEmail)); // Remove request from state
  } catch (err) {
    console.error("Error confirming friend request:", err.message);
    alert("Could not confirm the friend request. Please try again.");
  }
};

 // Handle Delete action
const handleDelete = async (requestEmail) => {
  try {
    const response = await fetch("http://localhost:5000/api/friends/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email1: user.email, // Logged-in user's email
        email2: requestEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    setRequests((prev) => prev.filter((req) => req.owner.email !== requestEmail)); // Remove request from state
  } catch (err) {
    console.error("Error deleting friend request:", err.message);
    alert("Could not delete the friend request. Please try again.");
  }
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
    return <p className="no-requests-message">You have no pending friend requests.</p>;
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
              src={request.image || "/data/images/default-dog.jpg"}
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
                color="error" // Red for Delete
                className="delete-btn"
                onClick={() => handleDelete(request.owner.email)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FriendRequests;

