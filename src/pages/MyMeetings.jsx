import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../css/MyMeetings.css';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import EmptyState from '../components/EmptyState';
const API_URL = process.env.REACT_APP_BACKEND_URL;
function MyMeetings() {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState({
    upcomingMeetings: [],
    pastMeetings: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const deleteMeeting = async (meeting) => {
    setDialogMessage('Are you sure you want to cancel the meeting?');
    setDialogOpen(true);

    setOnConfirmAction(() => async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/meetings/delete-meeting/${meeting.meeting_id}`,
          { method: 'DELETE' }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setMeetings((prevState) => ({
          upcomingMeetings: prevState.upcomingMeetings.filter(
            (m) => m.meeting_id !== meeting.meeting_id
          ),
          pastMeetings: prevState.pastMeetings.filter(
            (m) => m.meeting_id !== meeting.meeting_id
          ),
        }));

        setDialogMessage('Meeting cancelled successfully.');
      } catch (err) {
        setDialogMessage('Failed to cancel the meeting.');
        setError(err.message);
      }
    });
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/meetings/get-my-meetings?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchMeetings();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading your meetings...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (
    meetings.upcomingMeetings.length === 0 &&
    meetings.pastMeetings.length === 0
  ) {
    return <EmptyState message="You have no meetings scheduled." />;
  }

  return (
    <div className="my-meetings">
      <Typography variant="h4" className="page-title">
        My Meetings
      </Typography>

      {/* Upcoming Meetings Section */}
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
                    <TableCell>{meeting.time.slice(0, 5)}</TableCell>
                    <TableCell>{meeting.location}</TableCell>
                    <TableCell>{meeting.subject}</TableCell>
                    <TableCell>{meeting.buddyNameParticipant}</TableCell>
                    <TableCell>{meeting.ownerNameParticipant}</TableCell>
                    <TableCell>
                      <DeleteOutlinedIcon
                        className="delete"
                        onClick={() => deleteMeeting(meeting)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No upcoming meetings.</p>
        )}
      </div>

      {/* Past Meetings Section */}
      <div className="table-container" style={{ marginTop: '20px' }}>
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
                    <TableCell>{meeting.time.slice(0, 5)}</TableCell>
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

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          {dialogMessage === 'Are you sure you want to cancel the meeting?' ? (
            <>
              <Button
                onClick={() => setDialogOpen(false)}
                className="dialog-no-button"
              >
                No
              </Button>
              <Button
                onClick={async () => {
                  if (onConfirmAction) await onConfirmAction();
                  setDialogOpen(false);
                }}
                className="dialog-yes-button"
                autoFocus
              >
                Yes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setDialogOpen(false)}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyMeetings;
