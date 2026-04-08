const db = require('../config/db');

const Room = {
  findAll: async (pgIds = null) => {
    let query = 'SELECT * FROM rooms';
    let params = [];
    
    if (pgIds && pgIds.length > 0) {
      const placeholders = pgIds.map(() => '?').join(',');
      query += ` WHERE pg_id IN (${placeholders})`;
      params = pgIds;
    }
    
    query += ' ORDER BY id DESC';
    
    const [rows] = await db.execute(query, params);
    return rows;
  },

  create: async (roomData) => {
    const {
      room_number,
      capacity,
      rent_amount,
      room_type = 'single_sharing',
      images = [],
      facilities = [],
      pg_id
    } = roomData;

    const fields = ['room_number', 'capacity', 'rent_amount', 'room_type', 'images', 'facilities'];
    const values = [room_number, capacity, rent_amount, room_type, JSON.stringify(images), JSON.stringify(facilities)];
    const placeholders = fields.map(() => '?').join(',');

    if (pg_id) {
      fields.push('pg_id');
      values.push(pg_id);
      placeholders += ',?'; // Wait, no - placeholders already for values
    }

    const [result] = await db.execute(
      `INSERT INTO rooms (${fields.join(', ')}) VALUES (${placeholders})`,
      values
    );
    
    const [newRoom] = await db.execute('SELECT * FROM rooms WHERE id = ?', [result.insertId]);
    return newRoom[0];
  }
};

module.exports = Room;

