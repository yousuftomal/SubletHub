const express = require('express');
const router = express.Router();
const { submitComplaint, getAllComplaints } = require('../controllers/complaintController');

router.post('/create', submitComplaint);
router.get('/all', getAllComplaints);

module.exports = router;