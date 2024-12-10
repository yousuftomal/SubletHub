const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const upload = require('../config/multer');

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);

module.exports = router;
