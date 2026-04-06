const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const roleMiddlewareAdmin = roleMiddleware('admin');

// GET all tenants
router.get('/', authMiddleware, tenantController.getAllTenants);

// POST add tenant (admin only)
router.post('/', authMiddleware, roleMiddlewareAdmin, tenantController.createTenant);

module.exports = router;
