const Room = require('../models/roomModel');

exports.getAllRooms = async (req, res) => {
  try {
    const pgIds = req.query.pg_ids ? req.query.pg_ids.split(',').map(Number) : null;
    const rooms = await Room.findAll(pgIds);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const roomData = req.body;
    
    // Basic validation
    if (!roomData.room_number || !roomData.capacity || !roomData.rent_amount) {
      return res.status(400).json({ error: 'Missing required fields: room_number, capacity, rent_amount' });
    }
    // pg_id optional for now

    const newRoom = await Room.create(roomData);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRooms: exports.getAllRooms,
  createRoom: exports.createRoom
};

