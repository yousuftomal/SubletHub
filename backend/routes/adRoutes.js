const express = require('express');
const { postAd } = require('../controllers/adController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, postAd);

module.exports = router;
