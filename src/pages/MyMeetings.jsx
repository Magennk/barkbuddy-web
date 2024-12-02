import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; // Material-UI Button for actions
import "../css/MyMeetings.css"; // CSS for the page

function MyMeetings() {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]); // State to store upcoming meetings data
  const [pastMeetings, setPastMeetings] = useState([]); // State to store past meetings data

  // Fetch data on component load
  useEffect(() => {
    fetch("/data/meeting.json") // Path to the mock JSON file (ensure the path is correct)
      .then((res) => res.json())
      .then((data) => {
        // Assuming the JSON contains keys 'upcomingMeetings' and 'pastMeetings'
        setUpcomingMeetings(data.upcomingMeetings);
        setPastMeetings(data.pastMeetings);
      })
      .catch((err) => console.error("Error fetching meetings:", err)); // Log errors
  }, []);

  // Handle cancel meeting action
  const handleCancelMeeting = (index, meetingId) => {
    const confirmation = window.confirm("Are you sure you want to cancel this meeting?");
    if (confirmation) {
      // Send a request to the backend to cancel the meeting
      fetch(`/api/meetings/${meetingId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            const updatedMeetings = [...upcomingMeetings];
            updatedMeetings.splice(index, 1); // Remove the meeting from the list
            setUpcomingMeetings(updatedMeetings); // Update state
          } else {
            console.error("Failed to cancel the meeting.");
          }
        })
        .catch((err) => console.error("Error during meeting cancellation:", err));
    }
  };

  return (
    <div className="my-meetings">
      {/* Page title */}
      <Typography variant="h4" className="page-title">
        My meetings
      </Typography>

      {/* Upcoming Meetings Table */}
      <Typography variant="h5" className="table-title-meetings">
        Upcoming Meetings
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Buddy Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingMeetings.map((meeting, index) => (
              <TableRow key={index}>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>{meeting.buddyName}</TableCell>
                <TableCell>{meeting.location}</TableCell>
                <TableCell>{meeting.subject}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error" // Red button
                    onClick={() => handleCancelMeeting(index, meeting.id)}
                  >
                    Cancel Meeting
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Past Meetings Table */}
      <Typography variant="h5" className="table-title-meetings">
        Past Meetings
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Buddy Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastMeetings.map((meeting, index) => (
              <TableRow key={index}>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>{meeting.buddyName}</TableCell>
                <TableCell>{meeting.location}</TableCell>
                <TableCell>{meeting.subject}</TableCell>
                <TableCell>
                  <Button variant="contained" disabled style={{ backgroundColor: "#9e9e9e", color: "#ffffff" }}>
                    Meeting Occurred
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyMeetings;

