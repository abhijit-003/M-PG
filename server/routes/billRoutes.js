const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Stub routes
router.get('/', billController.getBills);

module.exports = router;

