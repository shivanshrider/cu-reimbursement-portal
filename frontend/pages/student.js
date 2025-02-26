import { useEffect, useState } from 'react';
import { Container, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';

export default function StudentDashboard() {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const savedRequest = JSON.parse(localStorage.getItem('request'));
    setRequest(savedRequest);
  }, []);

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
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

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