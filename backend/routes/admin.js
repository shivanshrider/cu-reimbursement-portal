const express = require('express');
const { getAllRequests, updateRequestStatus } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, getAllRequests);
router.patch('/update/:ticketId', authMiddleware, updateRequestStatus);

module.exports = router;