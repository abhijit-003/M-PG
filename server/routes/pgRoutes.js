const express = require('express');
const router = express.Router();
const pgController = require('../controllers/pgController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Protected routes
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', pgController.getMyPGs);
router.post('/', pgController.createPG);

module.exports = router;

