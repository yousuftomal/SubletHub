const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, phone, nationalID, age, occupation, password } = req.body;
  const profilePhoto = req.file ? req.file.path : null; // Handle file upload

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'Phone number already exists' });

    // Save the user directly, the password will be hashed by the 'pre-save' middleware
    const newUser = new User({
      name,
      phone,
      nationalID,
      age,
      occupation,
      profilePhoto,
      password, // Save the plain password; it will be hashed automatically
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login a user
exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  console.log('Login request data:', { phone, password }); // Log the request data
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      console.log('User not found'); // Log for debugging
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user); // Log the user data
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch); // Log password comparison result
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};



// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('ads');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};
