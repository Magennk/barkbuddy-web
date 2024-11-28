import React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../css/MyMeetings.css"; // CSS for the page

// Mock data for tables with added Location and Subject columns
const mockData = {
  upcomingMeetings: [
    { date: "2024-12-05", time: "10:30", buddyName: "Max", location: "Central Park", subject: "Walk" },
    { date: "2024-12-10", time: "15:00", buddyName: "Bella", location: "Café A", subject: "Training" },
    { date: "2024-12-15", time: "09:00", buddyName: "Charlie", location: "Dog Park", subject: "Playdate" },
  ],
  pastMeetings: [
    { date: "2024-11-25", time: "14:00", buddyName: "Luna", location: "Beach", subject: "Walk" },
    { date: "2024-11-20", time: "11:00", buddyName: "Rocky", location: "Café B", subject: "Training" },
    { date: "2024-11-15", time: "17:30", buddyName: "Daisy", location: "Park", subject: "Playdate" },
  ],
};

function MyMeetings() {
  const { upcomingMeetings, pastMeetings } = mockData;

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyMeetings;
