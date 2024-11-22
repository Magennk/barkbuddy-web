import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "../css/DogProfile.css";

function DogProfile() {
  const { id } = useParams(); // Get dog ID from URL
  const [dog, setDog] = useState(null);
  const [owner, setOwner] = useState(null);

  // Fetch mock data
  useEffect(() => {
    fetch(`/data/dogs.json`)
      .then((res) => res.json())
      .then((data) => {
        const selectedDog = data.find((d) => d.id.toString() === id);
        setDog(selectedDog);
        setOwner(selectedDog?.owner);
      })
      .catch((err) => console.error("Error fetching dog profile:", err));
  }, [id]);

  if (!dog || !owner) {
    // Show spinner while loading
    return (
      <Box className="loading-container">
        <CircularProgress size={80} thickness={5} />
      </Box>
    );
  }

  return (
    <div className="dog-profile">
      {/* Dog's Name as Page Title */}
      <Typography variant="h3" className="dog-profile-title">
        {dog.name}'s Profile
      </Typography>

      <Grid container spacing={4} className="profile-grid">
        {/* Left Section: Dog Info */}
        <Grid item xs={12} md={6}>
          <Card className="profile-card">
            <CardMedia
              component="img"
              image={dog.image}
              alt={dog.name}
              className="profile-image"
            />
            <CardContent>
              <Typography variant="h5" className="section-title">
                Dog Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {dog.name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {dog.age} years
              </Typography>
              <Box className="dog-sex">
                <strong>Sex:</strong>{" "}
                {dog.sex === "male" ? (
                  <MaleIcon style={{ color: "#2196f3" }} />
                ) : (
                  <FemaleIcon style={{ color: "#e91e63" }} />
                )}
              </Box>
              <Typography>
                <strong>Region:</strong> {dog.region}
              </Typography>
              <Typography>
                <strong>Breed:</strong> {dog.breed}
              </Typography>
              <Typography>
                <strong>Description:</strong> {dog.description}
              </Typography>
              {/* Status Icons */}
              <Box>
                <Typography>
                  <strong>Good with kids:</strong>{" "}
                  {dog.isgoodwithkids ? (
                    <SentimentSatisfiedAltIcon style={{ color: "green" }} />
                  ) : (
                    <SentimentVeryDissatisfiedIcon
                      style={{ color: "lightcoral" }}
                    />
                  )}
                </Typography>
                <Typography>
                  <strong>Vaccinated:</strong>{" "}
                  {dog.isvaccinated ? (
                    <SentimentSatisfiedAltIcon style={{ color: "green" }} />
                  ) : (
                    <SentimentVeryDissatisfiedIcon
                      style={{ color: "lightcoral" }}
                    />
                  )}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section: Owner Info */}
        <Grid item xs={12} md={6}>
          <Card className="profile-card">
            <CardMedia
              component="img"
              image={owner.image}
              alt={`${owner.firstname} ${owner.lastname}`}
              className="profile-image"
            />
            <CardContent>
              <Typography variant="h5" className="section-title">
                Owner Information
              </Typography>
              <Typography>
                <strong>Full Name:</strong> {owner.firstname} {owner.lastname}
              </Typography>
              <Typography>
                <strong>Age:</strong> {owner.age}
              </Typography>
              <Box className="owner-gender">
                <strong>Gender:</strong>{" "}
                {owner.gender === "male" ? (
                  <MaleIcon style={{ color: "#2196f3" }} />
                ) : (
                  <FemaleIcon style={{ color: "#e91e63" }} />
                )}
              </Box>
              <Typography>
                <strong>City:</strong> {owner.city}
              </Typography>
              <Typography>
                <strong>Email:</strong> {owner.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Buttons */}
      <Box className="profile-actions">
        <Button variant="contained" color="primary">
          Chat
        </Button>
        <Button variant="contained" color="secondary">
          Add Friend
        </Button>
        <Button variant="contained" color="success">
          Schedule a Meeting
        </Button>
      </Box>
    </div>
  );
}

export default DogProfile;
