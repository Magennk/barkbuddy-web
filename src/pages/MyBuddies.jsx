import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"; // For user context
import { useNavigate } from "react-router-dom"; // For navigation
import { Box, Typography, Button, Avatar, CircularProgress } from "@mui/material";
import "../css/MyBuddies.css"; // For custom styling

const MyBuddies = () => {
  const { user } = useContext(UserContext); // Get logged-in user's details
  const [friends, setFriends] = useState([]); // State to store friends
  const [loading, setLoading] = useState(true); // Spinner state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Navigation hook for profile redirection

  // Fetch friends from the backend
  useEffect(() => {
    const fetchMyFriends = async () => {
      try {
        setLoading(true); // Show spinner while loading
        const response = await fetch(`http://localhost:5000/api/friends/my-friends?email=${user.email}`);
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
      console.error("Dog ID is undefined");
    }
  };

  // Handle Remove Buddy action
const handleRemoveBuddy = async (buddyEmail) => {
  try {
    const response = await fetch("http://localhost:5000/api/friends/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email1: user.email, // Logged-in user's email
        email2: buddyEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    setFriends((prev) => prev.filter((friend) => friend.owner.email !== buddyEmail)); // Remove buddy from state
  } catch (err) {
    console.error("Error removing buddy:", err.message);
    alert("Could not remove the buddy. Please try again.");
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
    return <p className="no-friends-message">You don't have any buddies yet!</p>;
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
              src={dog.image || "/data/images/default-dog.jpg"}
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
              onClick={() => handleRemoveBuddy(dog.owner.email)} // Pass buddy's email
            >
              Delete Buddy
            </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyBuddies;
