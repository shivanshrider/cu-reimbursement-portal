const express = require('express');
const { trackRequest } = require('../controllers/studentController');

const router = express.Router();

// Track Reimbursement Status
router.post('/track', trackRequest);

module.exports = router;