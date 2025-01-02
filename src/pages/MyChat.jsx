import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { UserContext } from '../context/UserContext';
import EmptyState from '../components/EmptyState';
import '../css/MyChat.css'; // Dedicated CSS file for styling
import ChatIcon from '@mui/icons-material/Chat';
const API_URL = process.env.REACT_APP_BACKEND_URL;
const MyChat = () => {
  const { user } = useContext(UserContext); // Get the logged-in user's email
  const [chatUsers, setChatUsers] = useState([]); // State to store chat users
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState(null); // State to store any error message
  const navigate = useNavigate(); // Navigation to the chat page

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/api/chat/chat-users?email=${user.email}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setChatUsers(data.users); // Update state with chat users
      } catch (err) {
        setError(err.message); // Update error state
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchChatUsers();
  }, [user.email]); // Fetch data whenever the logged-in user's email changes

  if (loading) {
    return <p className="loading-text">Loading chats...</p>; // Show loading text
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>; // Show error message
  }

  // Navigate to the chat page
  const handleStartChat = (chatUser) => {
    if (chatUser?.chatid) {
      navigate(`/personal-chat/${chatUser.chatid}`, {
        state: { receiverEmail: chatUser.receiveremail }, // Pass receiverEmail
      });
    } else {
      console.error('Chat User or Chat ID is undefined');
    }
  };

  if (chatUsers.length === 0) {
    // Render a message if no friends are found
    return <EmptyState message="You don't have any chats yet!" />;
  }

  return (
    <Box className="my-chat-container">
      {/* Page Title */}
      <Typography variant="h4" className="page-title">
        Start chatting with your connections
      </Typography>

      {/* User List */}
      <Box className="chat-list">
        {chatUsers.map((chatUser) => (
          <Box key={chatUser.chatid} className="user-item">
            {/* User Avatar */}
            <Avatar
              src={chatUser.image || '/data/images/default-dog.jpg'}
              alt={`${chatUser.firstname} ${chatUser.lastname}`}
              className="user-avatar"
              sx={{ width: 130, height: 130 }} // Adjust avatar size
            />
            {/* User Details */}
            <Box className="user-details">
              <Typography variant="h6" className="user-name">
                {chatUser.firstname} {chatUser.lastname}
              </Typography>
              <Typography variant="body2" className="user-city">
                {chatUser.city}
              </Typography>
            </Box>
            {/* Start Chat Button */}
            <Button
              variant="contained"
              color="primary"
              className="start-chat-btn"
              startIcon={<ChatIcon />}
              onClick={() => handleStartChat(chatUser)}
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
