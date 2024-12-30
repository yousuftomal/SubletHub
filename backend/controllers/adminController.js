// controllers/adminController.js
const Complaint = require('../models/Complaint');
const Ad = require('../models/Ad'); // Import the Ad model

// Fetch all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email');
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific complaint and the associated ad
exports.deleteComplaint = async (req, res) => {
  const { id } = req.params; // Get the complaint ID from the request parameters
  try {
    // Find the complaint to get the associated ad title
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Delete the associated ad using the accusedPostTitle
    const deletedAd = await Ad.findOneAndDelete({ title: complaint.accusedPostTitle });
    if (!deletedAd) {
      console.log('Ad not found for deletion');
    }

    // Now delete the complaint
    await Complaint.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Complaint and associated ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint and ad:', error);
    res.status(500).json({ message: error.message });
  }
};