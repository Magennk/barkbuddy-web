import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Box, Typography, TextField, Button } from '@mui/material';
import '../css/PersonalChat.css';

const PersonalChat = () => {
  const { user } = useContext(UserContext); // Logged-in user
  const { chatid } = useParams(); // Get chat ID from the URL
  const [receiverEmail, setReceiverEmail] = useState(''); // Receiver's email
  const [messages, setMessages] = useState([]); // Chat messages
  const [newMessage, setNewMessage] = useState(''); // Input for new messages
  const [error, setError] = useState(''); // Error state

  // To make chat scrolled down
  const chatContainerRef = useRef(null);

  // Fetch chat messages
  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chat/messages/${chatid}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch messages.');
      }
      const data = await response.json();

      if (data.messages) {
        // Preprocess messages to format the time
        const formattedMessages = data.messages.map((message) => ({
          ...message,
          readableTime: new Date(
            `1970-01-01T${message.messagetime}Z`
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }));
        setMessages(formattedMessages);
      } else {
        setMessages([]);
        console.warn('No messages found.');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages.');
    }
  }, [chatid]);

  // Fetch receiver email (e.g., from backend or previous state)
  const fetchReceiverDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chat/chat-users?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch chat details.');
      }
      const data = await response.json();

      const currentChat = data.users.find(
        (chat) => chat.chatid === parseInt(chatid, 10)
      );
      if (currentChat) {
        setReceiverEmail(currentChat.receiveremail);
      }
    } catch (err) {
      console.error('Error fetching chat details:', err);
    }
  }, [chatid, user.email]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      setError('Message cannot be empty.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/chat/send-message',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: parseInt(chatid, 10),
            senderEmail: user.email,
            receiverEmail: receiverEmail,
            messageText: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      setNewMessage(''); // Clear input
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message.');
    }
  };

  // Auto-refresh messages every 5 seconds
  useEffect(() => {
    fetchMessages();
    fetchReceiverDetails();
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, [fetchMessages, fetchReceiverDetails]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Trigger whenever messages are updated

  return (
    <Box className="personal-chat-container">
      {/* Chat Header */}
      <Typography variant="h5" className="chat-header">
        Chat with {receiverEmail || 'Loading...'}
      </Typography>

      {/* Chat History */}
      <Box className="chat-history" ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Box
              key={message.messageid}
              className={`chat-message ${
                message.senderemail === user.email ? 'sent' : 'received'
              }`}
            >
              <Typography className="message-sender">
                {message.senderemail === user.email ? 'You' : 'Them'}:
              </Typography>
              <Typography className="message-text">
                {message.messagetext}
              </Typography>
              <Typography className="message-timestamp">
                {new Date(message.messagedate).toLocaleDateString()}{' '}
                {message.readableTime}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography className="no-messages-text">
            No messages yet. Start the conversation!
          </Typography>
        )}
      </Box>

      {/* Message Input */}
      <Box className="message-input-container">
        <TextField
          variant="outlined"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            setError(''); // Clear error on input
          }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setNewMessage('')}
        >
          Clear
        </Button>
      </Box>

      {/* Error Message */}
      {error && <Typography className="error-text">{error}</Typography>}
    </Box>
  );
};

export default PersonalChat;
