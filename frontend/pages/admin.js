import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import RequestTable from '../components/RequestTable';
import api from '../utils/api'; // Import the api utility

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/api/admin/dashboard'); // Use api.get
        console.log(response)
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          router.push('/login');
        } else {
          setError('Failed to fetch requests. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (ticketId, status) => {
    try {
      await api.patch(`/api/admin/update/${ticketId}`, { status }); // Use api.patch
      setRequests((prev) =>
        prev.map((req) =>
          req.ticketId === ticketId ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <RequestTable requests={requests} onUpdateStatus={handleUpdateStatus} />
      </Box>
    </Container>
  );
}