const express = require('express');
const router = express.Router();
const { getAllComplaints, deleteComplaint } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');

// Middleware to protect admin routes
router.use(adminAuth);

// Fetch all complaints
router.get('/complaints', getAllComplaints);

// Delete a specific complaint
router.delete('/complaints/delete/:id', deleteComplaint);

module.exports = router;