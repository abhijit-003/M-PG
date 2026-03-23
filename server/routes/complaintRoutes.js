const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Stub routes
router.get('/', complaintController.getComplaints);

module.exports = router;

