import React, { useEffect, useState, useContext} from "react";
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
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { UserContext } from "../context/UserContext"; // Access logged-in user's details

{/*Example for JSON returing from http://localhost:5000/api/dogs/dog/${id}/with-owner
{
    "id": 1,
    "name": "Cooper",
    "breed": "Golden Retriever",
    "age": "6",
    "sex": "Male",
    "region": "Shfela",
    "isvaccinated": true,
    "isgoodwithkids": true,
    "isgoodwithanimals": true,
    "isinrestrictedbreedscategory": false,
    "description": "Friendly and playful dog",
    "energylevel": "2",
    "image": "/data/images/1.jpeg",
    "owner": {
        "firstname": "Matan",
        "lastname": "Levi",
        "email": "matan1@example.com",
        "gender": "Male",
        "age": "39",
        "city": "Tel-Aviv",
        "image": "http://example.com/profile1"
    }
}
  */}

function DogProfile() {
  const { user } = useContext(UserContext); // Access user context to get logged-in user's email
  const { id } = useParams(); // Get dog ID from URL
  const [dog, setDog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`http://localhost:5000/api/dogs/dog/${id}/with-owner`); // Fetch dog data with id as variable
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse response JSON
        setDog(data); // Set the dog data
        setOwner(data.owner); // Set the owner data (nested in dog object)
      } catch (err) {
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchDogData(); // Fetch data on component mount or when id changes
  }, [id]);

  if (loading) {
    return <p>Loading dog profile...</p>; // Loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Error message
  }

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
  startIcon={<ChatIcon />}
  onClick={async () => {
    const loggedInUserEmail = user?.email; // Logged-in user's email from context
    const dogOwnerEmail = owner.email; // Owner's email from the profile

    try {
      // Initialize the chat by calling the backend
      const response = await fetch("http://localhost:5000/api/chat/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerEmail1: loggedInUserEmail,
          ownerEmail2: dogOwnerEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize chat");
      }

      // Navigate to the PersonalChat page after successfully initializing the chat
      navigate(`/personal-chat/${dogOwnerEmail}`, {
        state: { ownerEmail: dogOwnerEmail, ownerName: owner.firstname },
      });
    } catch (error) {
      console.error("Error initializing chat:", error.message);
      alert("Failed to start chat. Please try again.");
    }
  }}
>
  Chat
</Button>



        <Button
          variant="contained"
          color="primary"
          className="equal-button"
          startIcon={<PersonAddIcon />}
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:5000/api/friends/send-request", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  senderEmail: user.email, // The logged-in user's email
                  recipientEmail: owner.email, // The owner's email from the profile
                }),
              });
        
              if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
        
              alert("Friend request sent successfully!");
            } catch (err) {
              console.error("Error sending friend request:", err.message);
              alert("Could not send friend request.");
            }
          }}
        >
          Add Friend
        </Button>
       
        <Button
        variant="contained"
        color="primary"
        className="equal-button"
        startIcon={<CalendarTodayIcon />}
        onClick={() => navigate("/schedule-a-meeting", { state: { buddyName: dog.name , ownerEmail: owner.email} })}
      >
        Schedule a Meeting
      </Button>
      </Box>
    </div>
  );
}

export default DogProfile;
