const Ad = require('../models/Ad');

exports.postAd = async (req, res) => {
  const { title, description, rent, location, preferredOccupation } = req.body;
  const userId = req.user.id;
  try {
    const newAd = new Ad({
      title,
      description,
      rent,
      location,
      preferredOccupation,
      user: req.user.id, // Assuming you have user info in req.user
    });
    await newAd.save();
    res.status(201).json({ message: 'Ad posted successfully' });
  } catch (error) {
    console.error('Error posting ad:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};
