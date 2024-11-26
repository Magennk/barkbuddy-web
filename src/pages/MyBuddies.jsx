import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import "../css/MyBuddies.css"; // External CSS for styling

const MyBuddies = () => {
  const [buddies, setBuddies] = useState([]); // State to hold the list of buddies

  useEffect(() => {
    // Simulate fetching buddy data (replace this with actual backend call)
    const mockBuddies = [
      { id: 1, name: "Cooper", city: "Tel Aviv", image: "/images/dog1.jpeg" },
      { id: 2, name: "Max", city: "Ramat Gan", image: "/images/dog2.jpeg" },
      { id: 3, name: "Leo", city: "Kfar Saba", image: "/images/dog3.jpeg" },
    ];
    setBuddies(mockBuddies);
  }, []);

  return (
    <div className="my-buddies-container">
      {/* Page title */}
      <Typography variant="h4" className="page-title">
        Here are your buddy's buddies
      </Typography>

      {/* Buddy list container */}
      <div className="buddies-list">
        {buddies.map((buddy) => (
          <div className="buddy-card" key={buddy.id}>
            {/* Buddy's image */}
            <img src={buddy.image} alt={buddy.name} className="buddy-image" />
            {/* Buddy's name and city */}
            <div className="buddy-details">
              <Typography variant="h6" className="buddy-name">
                {buddy.name}
              </Typography>
              <Typography variant="body2" className="buddy-city">
                {buddy.city}
              </Typography>
            </div>
            {/* View Profile button */}
            <Button
              variant="contained"
              color="primary"
              className="view-profile-button"
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBuddies;
