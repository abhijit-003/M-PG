const pgService = require('../services/pgService');

exports.getMyPGs = async (req, res) => {
  try {
    const ownerId = req.user.id; // from auth middleware
    const pgs = await pgService.getPGsByOwner(ownerId);
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPG = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const newPg = await pgService.createPG(req.body, ownerId);
    res.status(201).json(newPg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMyPGs: exports.getMyPGs,
  createPG: exports.createPG
};

