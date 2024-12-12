import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Avatar } from "@mui/material";
import "../css/MyChat.css"; // Dedicated CSS file for styling
import ChatIcon from "@mui/icons-material/Chat";

const MyChat = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const navigate = useNavigate(); // Navigation to the chat page

  // Fetch user data on component load
  useEffect(() => {
    fetch("/data/dogs.json") // Path to mock JSON
      .then((res) => res.json())
      .then((data) => setUsers(data)) // Update state with fetched data
      .catch((err) => console.error("Error fetching users:", err)); // Log errors
  }, []);

  // Navigate to the chat page
  const handleStartChat = (userId) => {
    if (userId) {
      navigate(`/personal-chat/${userId}`);
 // Use dynamic routing with the user ID
    } else {
      console.error("User ID is undefined");
    }
  };

  return (
    <Box className="my-chat-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Start chatting with your connections
      </Typography>

      {/* User List */}
      <Box className="chat-list">
        {users.map((user) => (
          <Box key={user.id} className="user-item">
            {/* User Avatar */}
            <Avatar
              src={user.image || "/data/images/default-dog.jpg"}
              alt={user.name}
              className="user-avatar"
              sx={{ width: 130, height: 130 }} // Use sx to adjust size
            />
            {/* User Details */}
            <Box className="user-details">
              <Typography variant="h6" className="user-name">
                {user.name}
              </Typography>
              <Typography variant="body2" className="user-city">
                {user.city}
              </Typography>
            </Box>
            {/* Start Chat Button */}
            <Button
              variant="contained"
              color="primary"
              className="start-chat-btn"
              startIcon={<ChatIcon />}
              onClick={() => handleStartChat(user.id)}
            >
              Start Chat
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyChat;
