const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  uid: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  teamSize: { type: Number, required: true },
  prize: { type: String, required: true },
  reimbursementAmount: { type: Number, required: true },
  teamDetails: [
    { name: String, uid: String, role: String },
  ],
  status: { type: String, enum: ['Registered', 'Approved', 'In Process', 'Done'], default: 'Registered' },
});

module.exports = mongoose.model('Request', RequestSchema);