const Request = require('../models/Request');

// Track Reimbursement Status
const trackRequest = async (req, res) => {
  const { ticketId } = req.body;

  try {
    // Find the request by ticketId
    const request = await Request.findOne({ ticketId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  trackRequest,
};