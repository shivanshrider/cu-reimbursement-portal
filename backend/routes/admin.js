const express = require('express');
const adminController = require('../controllers/adminController'); // Import adminController
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch All Requests
router.get('/dashboard', authMiddleware, adminController.getAllRequests);

// Update Request Status
router.patch('/update/:ticketId', authMiddleware, adminController.updateRequestStatus);

module.exports = router;