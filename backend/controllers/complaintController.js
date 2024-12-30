const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');

const submitComplaint = async (req, res) => {
  try {
    const { userId, accusedPostTitle, complaintText } = req.body;

    if (!userId || !accusedPostTitle || !complaintText) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required: userId, accusedPostTitle, and complaintText' 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID format.' 
      });
    }

    const newComplaint = new Complaint({
      user: userId,
      accusedPostTitle,
      complaintText
    });

    await newComplaint.save();

    res.status(201).json({ 
      success: true, 
      message: 'Complaint submitted successfully.', 
      data: newComplaint 
    });
  } catch (error) {
    console.error('Error submitting complaint:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Complaint.countDocuments();

    res.status(200).json({
      success: true,
      data: complaints,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalComplaints: total
      }
    });
  } catch (error) {
    console.error('Error fetching complaints:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { submitComplaint, getAllComplaints };