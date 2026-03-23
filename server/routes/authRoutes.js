const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Login for admin/tenant
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes example
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Protected profile' });
});

module.exports = router;

