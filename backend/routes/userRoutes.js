const express = require('express');
const { registerUser } = require('../controllers/userController');
const upload = require('../config/multer');
const { getUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUserById);

module.exports = router;
