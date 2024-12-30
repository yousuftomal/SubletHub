const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accusedPostTitle: {
    type: String,
    required: true,
  },
  complaintText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);