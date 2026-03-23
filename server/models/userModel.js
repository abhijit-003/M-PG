const db = require('../config/db');

exports.findByEmail = async (email) => {
  console.log("query");
  const [rows] = await db.execute(
    'SELECT id, email, password, role, full_name, age FROM users WHERE email = ?',
    [email]
  );
  console.log("result: ",rows[0]);
  return rows[0];
};

exports.create = async (userData) => {
  const [result] = await db.execute(
'INSERT INTO users (email, password, full_name, age, role) VALUES (?, ?, ?, ?, ?)',
    [userData.email, userData.password, userData.full_name, userData.age, userData.role]
  );
  return result.insertId;
};

module.exports = {
  findByEmail: exports.findByEmail,
  create: exports.create
};

