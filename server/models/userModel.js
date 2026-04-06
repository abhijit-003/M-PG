const db = require('../config/db');

// Find user by email for login
const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT id, email, password, full_name, age, role FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

// Create user or tenant
const create = async (userData) => {
  const { email, password, full_name, age, role } = userData;
  const [result] = await db.execute(
    'INSERT INTO users (email, password, full_name, age, role) VALUES (?, ?, ?, ?, ?)',
    [email, password, full_name || null, age || null, role]
  );
  return { id: result.insertId, email, full_name, age, role };
};

// Get all tenants
const findTenants = async () => {
  const [rows] = await db.execute(
    'SELECT id, email, full_name, age FROM users WHERE role = ?',
    ['tenant']
  );
  return rows;
};

module.exports = {
  findByEmail,
  create,
  findTenants
};
