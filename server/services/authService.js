const jwt = require('jsonwebtoken');
const config = require('../config/env');

exports.generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, config.jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateToken: exports.generateToken,
  verifyToken: exports.verifyToken
};

