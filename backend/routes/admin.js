const express = require('express');
const { getAllRequests, updateRequestStatus } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch All Requests
router.get('/dashboard', authMiddleware, getAllRequests);

// Update Request Status
router.patch('/update/:ticketId', authMiddleware, updateRequestStatus);

module.exports = router;