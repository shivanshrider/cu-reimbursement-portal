import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const RequestTable = ({ requests, onUpdateStatus }) => {
  return (
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
                  onClick={() => onUpdateStatus(request.ticketId, 'Done')}
                >
                  Mark as Done
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestTable;