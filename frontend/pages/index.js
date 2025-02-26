import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ticketId, setTicketId] = useState('');
  const router = useRouter();

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/admin');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  const handleStudentTrack = async () => {
    try {
      const response = await axios.post('/api/student/track', { ticketId });
      localStorage.setItem('request', JSON.stringify(response.data));
      router.push('/student');
    } catch (error) {
      console.error('Tracking failed', error);
      alert('Request not found');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CU Reimbursement Portal
        </Typography>

        {/* Admin Login */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Admin Login</Typography>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleAdminLogin} sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>

        {/* Student Portal */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Student Portal</Typography>
          <TextField
            label="Ticket ID"
            fullWidth
            margin="normal"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <Button variant="contained" onClick={handleStudentTrack} sx={{ mt: 2 }}>
            Track Status
          </Button>
        </Box>
      </Box>
    </Container>
  );
}