const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

// Get all tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await userModel.findTenants();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new tenant
const createTenant = async (req, res) => {
  try {
    const { full_name, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTenant = await userModel.create({
      email,
      password: hashedPassword,
      full_name,
      age,
      role: 'tenant'
    });
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTenants,
  createTenant
};
