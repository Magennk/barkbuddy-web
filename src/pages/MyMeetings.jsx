import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext for logged-in user
import "../css/MyMeetings.css"; // Import CSS for the page
import CircularProgress from "@mui/material/CircularProgress"; // Loading spinner
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Typography } from "@mui/material";


function MyMeetings() {
  const { user } = useContext(UserContext); // Get logged-in user
  const [meetings, setMeetings] = useState({ upcomingMeetings: [], pastMeetings: [] }); // Store meetings data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const deleteMeeting = (meeting) => {

    const conf = window.confirm("Are you sure you want to cancel the meeting?")

    if(conf) {
      // here you send a server request to delete meeting
    }
  }
  // Fetch meetings from the backend
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state

        const response = await fetch(
          `http://localhost:5000/api/meetings/get-my-meetings?email=${user.email}`
        ); // Fetch meetings for logged-in user
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response JSON
        console.log(data)
        setMeetings(data); // Update meetings state
      } catch (err) {
        setError(err.message); // Capture error
      } finally {
        setLoading(false); // End loading
      }
    };

    if (user && user.email) {
      fetchMeetings(); // Call API only if user is logged in
    }
  }, [user]);

  // Render loading spinner
  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress /> {/* Material-UI spinner */}
        <p>Loading your meetings...</p>
      </div>
    );
  }

  // Render error message
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  // Render no meetings message
  if (meetings.upcomingMeetings.length === 0 && meetings.pastMeetings.length === 0) {
    return <p className="no-meetings-message">You have no meetings scheduled.</p>;
  }

  return (
    <div className="my-meetings">
      <Typography variant="h4" className="page-title">
        My Meetings
      </Typography>

      {/* Upcoming Meetings */}
      <div className="table-container">
        <h2 className="table-title-meetings">Upcoming Meetings</h2>
        {meetings.upcomingMeetings.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Buddy</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.upcomingMeetings.map((meeting, index) => (
                  <TableRow key={index}>
                    <TableCell>{meeting.date}</TableCell>
                    <TableCell>{meeting.time.slice(0, 5)}</TableCell> {/* Display hh:mm */}
                    <TableCell>{meeting.location}</TableCell>
                    <TableCell>{meeting.subject}</TableCell>
                    <TableCell>{meeting.buddyNameParticipant}</TableCell>
                    <TableCell>{meeting.ownerNameParticipant}</TableCell>
                    <TableCell onClick={() => deleteMeeting(meeting)}><DeleteOutlinedIcon className="delete"/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No upcoming meetings.</p>
        )}
      </div>

      {/* Past Meetings */}
      <div className="table-container">
        <h2 className="table-title-meetings">Past Meetings</h2>
        {meetings.pastMeetings.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Buddy</TableCell>
                  <TableCell>Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.pastMeetings.map((meeting, index) => (
                  <TableRow key={index}>
                    <TableCell>{meeting.date}</TableCell>
                    <TableCell>{meeting.time.slice(0, 5)}</TableCell> {/* Display hh:mm */}
                    <TableCell>{meeting.location}</TableCell>
                    <TableCell>{meeting.subject}</TableCell>
                    <TableCell>{meeting.buddyNameParticipant}</TableCell>
                    <TableCell>{meeting.ownerNameParticipant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No past meetings.</p>
        )}
      </div>
    </div>
  );
}

export default MyMeetings;
