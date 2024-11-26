import React, { useEffect, useState } from "react";
import DogCard from "../components/DogCard"; // Import DogCard component
import { Typography } from "@mui/material";
import "../css/MeetNewBuddies.css"; // CSS for the page

function MeetNewBuddies() {
  const [dogs, setDogs] = useState([]); // State to hold list of dogs

  // Fetch data from the mock JSON (or API in the future)
  useEffect(() => {
    fetch("/data/dogs.json") // Path to mock JSON
      .then((res) => res.json()) // Parse response as JSON
      .then((data) => setDogs(data)) // Store data in state
      .catch((err) => console.error("Error fetching dogs:", err)); // Log any errors
  }, []);

  return (
    <div className="meet-new-buddies">
      {/* Page title */}
      <Typography variant="h4" className="page-title">
        Meet New Buddies
      </Typography>

      {/* Container for all dog cards */}
      <div className="dog-list">
        {/* Map through the list of dogs and render a DogCard for each one */}
        {dogs.map((dog, index) => (
          <div className="dog-card-container" key={dog.dogid || index}>
            <DogCard dog={dog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetNewBuddies;
