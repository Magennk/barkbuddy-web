import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Importing UserContext for user information
import "../css/MeetNewBuddies.css"; // Importing existing CSS for styling
import DogCard from "../components/DogCard"; // Using DogCard component for each dog
import CircularProgress from "@mui/material/CircularProgress"; // Importing MUI CircularProgress
import {Typography } from "@mui/material";

function MeetNewBuddies() {
  const { user } = useContext(UserContext); // Getting the logged-in user from context
  const [dogs, setDogs] = useState([]); // State for dog data
  const [loading, setLoading] = useState(true); // State to show spinner while loading
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchNotFriendsDogsAndOwners = async () => {
      try {
        setLoading(true); // Show loading spinner
        const response = await fetch(
          `http://localhost:5000/api/dogs/not-friends-dogs-and-owners?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json();
        setDogs(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Set error state if fetch fails
      } finally {
        setLoading(false); // Hide spinner
      }
    };

    fetchNotFriendsDogsAndOwners(); // Trigger fetch on component mount
  }, [user.email]); // Re-fetch data if user email changes

  if (loading) {
    // Render spinner while data is loading
    return (
      <div className="spinner-container">
        <CircularProgress />
        <p>Loading new buddies...</p>
      </div>
    );
  }

  if (error) {
    // Render error message if an error occurs
    return <p className="error-message">Error: {error}</p>;
  }

  if (dogs.length === 0) {
    // Render a message if no dogs are found
    return <p className="no-dogs-message">No new buddies available!</p>;
  }

  return (
    <div className="meet-new-buddies">
      <Typography variant="h4" className="page-title">
        Meet New Buddies
      </Typography>
      <div className="dog-list">
        {dogs.map((dog, index) => (
          <div className="dog-card-container" key={dog.id || index}>
            <DogCard dog={dog} /> {/* Render each dog with DogCard */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetNewBuddies;
