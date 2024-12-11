const Ad = require('../models/Ad');
const User = require('../models/User');

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


exports.fetchRecommendedAds = async (req, res) => {
  const { occupation } = req.query;  // Get occupation from the query params
  if (!occupation) {
    return res.status(400).json({ message: 'Occupation is required' });
  }

  try {
    // Query to fetch ads where preferredOccupation matches the provided occupation
    const ads = await Ad.find({ preferredOccupation: occupation })
       // Populating the user field, assuming you have a user field in your Ad schema

    if (ads.length === 0) {
      return res.status(404).json({ message: 'No recommended ads found for this occupation' });
    }

    res.json(ads); // Return the ads that match the occupation
  } catch (error) {
    console.error('Error fetching recommended ads:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


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
