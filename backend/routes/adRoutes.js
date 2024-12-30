// adRoutes.js
const express = require('express');
const { 
  fetchAds, 
  fetchRecommendedAds, 
  postAd, 
  fetchAdById, 
  updateAd,
  searchAds,
  deleteAd 
} = require('../controllers/adController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the routes - order matters!
router.get('/search', searchAds); // Move search route first
router.get('/recommended', fetchRecommendedAds);
router.get('/:id', fetchAdById);
router.post('/', auth, postAd);
router.put('/:id', auth, updateAd);
router.get('/', fetchAds);
router.delete('/delete/:id', auth, deleteAd); // Delete an ad by ID


module.exports = router;