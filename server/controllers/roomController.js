const Room = require('../models/roomModel');

exports.getAllRooms = async (req, res) => {
  // TODO: Implement
  res.json({ message: 'Rooms stub' });
};

exports.createRoom = async (req, res) => {
  // TODO: Implement
  res.json({ message: 'Create room stub' });
};

// Add more methods as needed
module.exports = {
  getAllRooms: exports.getAllRooms,
  createRoom: exports.createRoom
};

