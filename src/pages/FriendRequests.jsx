import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Avatar } from "@mui/material";
import "../css/FriendRequests.css"; // Dedicated CSS file for styling

const FriendRequests = () => {
  const [requests, setRequests] = useState([]); // State to store friend requests data
  const navigate = useNavigate(); // Navigation to the dog profile page

  // Fetch dog data on component load
  useEffect(() => {
    fetch("/data/dogs.json") // Path to mock JSON
      .then((res) => res.json())
      .then((data) => setRequests(data)) // Update state with fetched data
      .catch((err) => console.error("Error fetching dogs:", err)); // Log errors
  }, []);
  

  // Navigate to the dog profile page
  const handleViewProfile = (dogId) => {
    if (dogId) {
      navigate(`/dog-profile/${dogId}`); // Use dynamic routing with the dog ID
    } else {
      console.error("Dog ID is undefined");
    }
  };

  // Handle Confirm action
  const handleConfirm = (dogId) => {
    console.log(`Friend request confirmed for dog ID: ${dogId}`);
    // Add your confirm logic here (e.g., API call to accept the request)
  };

  // Handle Delete action
  const handleDelete = (dogId) => {
    console.log(`Friend request deleted for dog ID: ${dogId}`);
    // Add your delete logic here (e.g., API call to reject the request)
  };

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
                onClick={() => handleConfirm(request.id)}
                sx={{ marginRight: 1 }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="error" // Red for Delete
                className="delete-btn"
                onClick={() => handleDelete(request.id)}
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

