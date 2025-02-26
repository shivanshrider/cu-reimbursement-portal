import { useEffect, useState } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch requests', error);
        router.push('/');
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (ticketId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/update/${ticketId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.ticketId === ticketId ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.ticketId}>
                  <TableCell>{request.ticketId}</TableCell>
                  <TableCell>{request.studentName}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleUpdateStatus(request.ticketId, 'Done')}
                    >
                      Mark as Done
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}