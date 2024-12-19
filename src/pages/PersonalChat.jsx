import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../css/PersonalChat.css"; 

const PersonalChat = () => {
  const { userId } = useParams(); // The dog's owner email passed as a route parameter
  const location = useLocation();
  const { ownerEmail, ownerName } = location.state || {};
  const loggedInUserEmail = "loggedInUser@example.com"; // Replace with logged-in user's email

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chat/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerEmail1: loggedInUserEmail,
            ownerEmail2: userId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }

        const data = await response.json();
        setMessages(data.chatHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error.message);
      }
    };

    fetchChatHistory();
  }, [userId, loggedInUserEmail]);

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: loggedInUserEmail,
          receiverEmail: userId,
          messageText: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const savedMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, savedMessage]); // Append new message
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="page-title">Chat with {ownerName || "Unknown User"}</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.senderemail === loggedInUserEmail ? "my-message" : "partner-message"
            }
          >
            <strong>
              {msg.senderemail === loggedInUserEmail ? "You" : ownerName}:
            </strong>{" "}
            {msg.messagetext}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default PersonalChat;





