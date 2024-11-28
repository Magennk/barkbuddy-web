import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "../css/DogProfile.css";
import { useNavigate } from "react-router-dom";

function DogProfile() {
  const { id } = useParams(); // Get dog ID from URL
  const [dog, setDog] = useState(null);
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

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
        <div className="spinner"></div>
      </Box>
    );
  }

  return (
    <div className="dog-profile">
      {/* Dog's Name as Page Title */}
      <Typography variant="h3" className="dog-profile-title">
        {dog.name}'s Profile
      </Typography>
      
      <div className="profile-container">
        {/* Left Section: Dog Info */}
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
              <span className="label">Name:</span> {dog.name}
            </Typography>
            <Typography>
              <span className="label">Age:</span> {dog.age} years
            </Typography>
            <Typography>
              <span className="label">Sex:</span>{" "}
              {dog.sex === "male" ? (
                <MaleIcon className="icon male" />
              ) : (
                <FemaleIcon className="icon female" />
              )}
            </Typography>
            <Typography>
              <span className="label">Region:</span> {dog.region}
            </Typography>
            <Typography>
              <span className="label">Breed:</span> {dog.breed}
            </Typography>
            <Typography>
              <span className="label">Vaccinated:</span>{" "}
              {dog.isvaccinated ? (
                <SentimentSatisfiedAltIcon className="icon positive" />
              ) : (
                <SentimentVeryDissatisfiedIcon className="icon negative" />
              )}
            </Typography>
            <Typography>
              <span className="label">Good with kids:</span>{" "}
              {dog.isgoodwithkids ? (
                <SentimentSatisfiedAltIcon className="icon positive" />
              ) : (
                <SentimentVeryDissatisfiedIcon className="icon negative" />
              )}
            </Typography>
            <Typography>
              <span className="label">Good with animals:</span>{" "}
              {dog.isgoodwithanimals ? (
                <SentimentSatisfiedAltIcon className="icon positive" />
              ) : (
                <SentimentVeryDissatisfiedIcon className="icon negative" />
              )}
            </Typography>
            <Typography>
              <span className="label">Dangerous dog breed:</span>{" "}
              {dog.isinrestrictedbreedscategory ? (
                <SentimentSatisfiedAltIcon className="icon positive" />
              ) : (
                <SentimentVeryDissatisfiedIcon className="icon negative" />
              )}
            </Typography>
            <Typography>
              <span className="label">Energy Level:</span>{" "}
              {Array(dog.energylevel)
                .fill(null)
                .map((_, i) => (
                  <FlashOnIcon key={i} style={{ color: "gold" }} />
                ))}
            </Typography>
            <Typography className="description">
              <span className="label">A bit more about me:</span>{" "}
              {dog.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Right Section: Owner Info */}
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
              <span className="label">Full Name:</span> {owner.firstname}{" "}
              {owner.lastname}
            </Typography>
            <Typography>
              <span className="label">Age:</span> {owner.age}
            </Typography>
            <Typography>
              <span className="label">Gender:</span>{" "}
              {owner.gender === "male" ? (
                <MaleIcon className="icon male" />
              ) : (
                <FemaleIcon className="icon female" />
              )}
            </Typography>
            <Typography>
              <span className="label">City:</span> {owner.city}
            </Typography>
            <Typography>
              <span className="label">Email:</span>{" "}
              <a href={`mailto:${owner.email}`} className="email-link">
                {owner.email}
              </a>
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Footer Buttons */}
      <Box className="profile-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Chat started")}
        >
          Chat
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => alert("Add friend function will run")}
        >
          Add Friend
        </Button>
       
        <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/schedule-a-meeting", { state: { buddyName: dog.name } })}
      >
        Schedule a Meeting
      </Button>
      </Box>
    </div>
  );
}

export default DogProfile;
