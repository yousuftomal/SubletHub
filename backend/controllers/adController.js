const Ad = require('../models/Ad');
const User = require('../models/User');
const mongoose = require('mongoose');

// Fetch all ads
exports.fetchAds = async (req, res) => {
  try {
    const ads = await Ad.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(10) // Limit to 10 ads
      .populate('user', 'name email'); // Populate user fields

    console.log('Fetched ads:', ads); // Debug log
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single ad by ID
exports.fetchAdById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' });
  }

  try {
    const ad = await Ad.findById(id).populate('user', 'name email');
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    console.error('Error fetching ad by ID:', error);
    res.status(500).json({ message: error.message });
  }
};


// Search ads based on keyword, location, and occupation
// adController.js
exports.searchAds = async (req, res) => {
  try {
    const { keyword, location, occupation, description } = req.query;

    // Build query object dynamically
    let query = {};
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } },
        { occupation: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Fetch ads with applied filters and sort by time posted
    const ads = await Ad.find(query)
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate('user', 'name email'); // Populate user fields

    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Error fetching ads', error: error.message });
  }
};

// Fetch recommended ads
exports.fetchRecommendedAds = async (req, res) => {
  const { occupation } = req.query; // Get occupation from the query params
  if (!occupation) {
    return res.status(400).json({ message: 'Occupation is required' });
  }

  try {
    // Query to fetch ads where preferredOccupation matches the provided occupation
    const ads = await Ad.find({ preferredOccupation: occupation })
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate('user', 'name email'); // Populate user fields

    if (ads.length === 0) {
      return res.status(404).json({ message: 'No recommended ads found for this occupation' });
    }

    res.json(ads); // Return the ads that match the occupation
  } catch (error) {
    console.error('Error fetching recommended ads:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Post a new ad
exports.postAd = async (req, res) => {
  const { title, description, rent, location, preferredOccupation } = req.body;
  const userId = req.user.id; // Get the user ID from the authenticated user

  try {
    const newAd = new Ad({
      title,
      description,
      rent,
      location,
      preferredOccupation,
      user: req.user.id, // Associate the ad with the user
    });
    await newAd.save();
    await User.findByIdAndUpdate(userId, { $push: { ads: newAd._id } });
    res.status(201).json({ message: 'Ad posted successfully' });
  } catch (error) {
    console.error('Error posting ad:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing ad
exports.updateAd = async (req, res) => {
  const { id } = req.params;
  const { title, description, rent, location, preferredOccupation } = req.body;

  try {
    const updatedAd = await Ad.findByIdAndUpdate(
      id,
      { title, description, rent, location, preferredOccupation },
      { new: true } // Return the updated ad
    );

    if (!updatedAd) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    res.json({ message: 'Ad updated successfully', ad: updatedAd });
  } catch (error) {
    console.error('Error updating ad:', error);
    res.status(500).json({ message: error.message });
  }
};
