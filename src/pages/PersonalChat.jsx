import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

function PersonalChat() {
  const { userId } = useParams(); // Get userId from the route

  return (
    <div className="my-chat-title">
      <Typography variant="h4" className="page-title">
        Chat with User: {userId}
      </Typography>
    </div>
  );
}

export default PersonalChat;
