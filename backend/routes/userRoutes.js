const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, getCurrentUser } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getCurrentUser); // New route for fetching current user profile
router.get('/:id', getUserById);
router.put('/update', auth, updateUser);

module.exports = router;
