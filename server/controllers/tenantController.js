const Tenant = require('../models/tenantModel');

exports.getAllTenants = async (req, res) => {
  // TODO: Implement
  res.json({ message: 'Tenants stub' });
};

module.exports = {
  getAllTenants: exports.getAllTenants
};

