import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, CardMedia, Paper } from "@mui/material";
import "../css/MyBuddies.css"; // Import CSS

const MyBuddies = () => {
  const [dogs, setDogs] = useState([]); // State to store the list of dogs
  const navigate = useNavigate(); // For navigation to profile page

  // Fetch the list of dogs from the JSON file
  useEffect(() => {
    fetch("/data/dogs.json") // Adjusted the path for your JSON
      .then((res) => res.json())
      .then((data) => setDogs(data)) // Store the fetched data
      .catch((err) => console.error("Error fetching dogs:", err));
  }, []);

  // Navigate to Dog Profile page
  const handleViewProfile = (dogId) => {
    if (dogId) {
      navigate(`/dog-profile/${dogId}`); // Navigate to the profile using dog ID
    } else {
      console.error("Dog ID is undefined.");
    }
  };

  return (
    <Box className="my-buddies-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Here are your buddy's buddies
      </Typography>

      {/* List of Dogs */}
      <Box className="dog-list">
        {dogs.map((dog) => (
          <Paper key={dog.id} className="dog-item" elevation={3}>
            <Grid container alignItems="center" spacing={2}>
              {/* Dog Image */}
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  image={dog.image || "/data/images/default-dog.jpg"} // Fallback to default image
                  alt={dog.name}
                  className="dog-image"
                />
              </Grid>
              {/* Dog Details */}
              <Grid item xs={6}>
                <Typography variant="h6" className="dog-name">
                  {dog.name}
                </Typography>
                <Typography variant="body2" className="dog-city">
                  {dog.region || "Unknown City"}
                </Typography>
              </Grid>
              {/* View Profile Button */}
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className="view-profile-btn"
                  onClick={() => handleViewProfile(dog.id)} // Pass the correct ID
                >
                  View Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MyBuddies;
