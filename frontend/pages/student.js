import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProgressTracker from '../components/ProgressTracker'; // Import the ProgressTracker component
import api from '../utils/api'; // Import the api utility

export default function StudentDashboard() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      const ticketId = localStorage.getItem('ticketId'); // Get ticketId from localStorage
      if (ticketId) {
        try {
          const response = await api.post('/api/student/track', { ticketId }); // Use api.post
          setRequest(response.data);
        } catch (error) {
          console.error('Error fetching request:', error);
          setError('Failed to fetch request details. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No ticket ID found. Please enter a valid ticket ID.');
        setLoading(false);
      }
    };

    fetchRequest();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!request) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4 }}>
          No request found. Please enter a valid ticket ID.
        </Typography>
      </Container>
    );
  }

  const steps = ['Registered', 'Approved', 'In Process', 'Done'];
  const activeStep = steps.indexOf(request.status);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reimbursement Status
        </Typography>

        {/* Progress Tracker */}
        <ProgressTracker activeStep={activeStep} /> {/* Use the ProgressTracker component */}

        {/* Request Details */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Request Details</Typography>
          <Typography>Event: {request.eventName}</Typography>
          <Typography>Date: {new Date(request.eventDate).toLocaleDateString()}</Typography>
          <Typography>Location: {request.location}</Typography>
          <Typography>Team Size: {request.teamSize}</Typography>
          <Typography>Prize: {request.prize}</Typography>
          <Typography>Reimbursement Amount: ₹{request.reimbursementAmount}</Typography>
        </Box>

        {/* Team Details */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Team Details</Typography>
          {request.teamDetails.map((member, index) => (
            <Typography key={index}>
              {member.name} ({member.role}) - UID: {member.uid}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
}