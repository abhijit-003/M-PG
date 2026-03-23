const Bill = require('../models/billModel');

exports.getBills = async (req, res) => {
  // TODO: Implement
  res.json({ message: 'Bills stub' });
};

module.exports = {
  getBills: exports.getBills
};

