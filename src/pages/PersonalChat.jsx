import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import "../css/PersonalChat.css"; 

function PersonalChat() {
  const { userId } = useParams(); // Get userId from the route
  const [userData, setUserData] = useState(null); // Store user data
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch user data from chat-data.json (this will simulate backend data)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/chat-data.json"); // Update the path as necessary
      const data = await response.json();
      
      const user = data.users.find((user) => user.id === userId); // Find user by ID
      if (user) {
        setUserData(user);
        setMessages(user.messages); // Set initial messages from mock data
      }
    };

    fetchData();
  }, [userId]);

  // Handle sending new messages (will later connect to backend)
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMessageData = {
        sender: "You", // The logged-in user
        text: newMessage,
        type: "sent",
      };

      // Add the new message to the chat (no auto-response logic)
      setMessages((prevMessages) => [...prevMessages, newMessageData]);

      // Clear the input field
      setNewMessage("");

      // Here, you'd send the new message to the backend or update the JSON file.
      // For now, just log it for debugging
      console.log("Message sent:", newMessageData);
    }
  };

  if (!userData) return <div>Loading...</div>; // Loading state

  return (
    <div className="chat-container">
      <Typography variant="h4" className="page-title">
        Chat with {userData.name}
      </Typography>

      <Box className="chat-box">
        {messages.map((msg, index) => (
          <Box
            key={index}
            className={msg.type === "sent" ? "my-message" : "partner-message"}
          >
            <Typography variant="body1">
              <strong>{msg.sender}:</strong> {msg.text}
            </Typography>
          </Box>
        ))}
      </Box>

      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        fullWidth
        placeholder="Type your message..."
        variant="outlined"
        className="message-input"
      />
      <Button onClick={sendMessage} variant="contained" className="send-button">
        Send
      </Button>
    </div>
  );
}

export default PersonalChat;



