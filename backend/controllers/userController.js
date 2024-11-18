const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('ads');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getUserById };
