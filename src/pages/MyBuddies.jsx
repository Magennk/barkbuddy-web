import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Avatar } from "@mui/material";
import "../css/MyBuddies.css"; // Dedicated CSS file for styling

const MyBuddies = () => {
  const [dogs, setDogs] = useState([]); // State to store dog data
  const navigate = useNavigate(); // Navigation to the dog profile page

  // Fetch dog data on component load
  useEffect(() => {
    fetch("/data/dogs.json") // Path to mock JSON
      .then((res) => res.json())
      .then((data) => setDogs(data)) // Update state with fetched data
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

  return (
    <Box className="my-buddies-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Here are your buddy's buddies
      </Typography>

      {/* Dog List */}
      <Box className="buddies-list">
        {dogs.map((dog) => (
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
      
    >
      Delete Buddy
    </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyBuddies;
