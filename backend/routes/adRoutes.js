const express = require('express');
const { fetchAds, fetchRecommendedAds, postAd } = require('../controllers/adController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the routes
router.get('/ads', fetchAds);
router.get('/ads/recommended', fetchRecommendedAds);
router.post('/ads', auth, postAd);

module.exports = router;
