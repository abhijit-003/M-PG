const db = require('../config/db');

const PG = {
  findAllByOwner: async (ownerId) => {
    const [rows] = await db.execute(
      'SELECT * FROM pgs WHERE owner_id = ? ORDER BY name',
      [ownerId]
    );
    return rows;
  },

  create: async (pgData) => {
    const { name, owner_id, address } = pgData;
    const [result] = await db.execute(
      'INSERT INTO pgs (name, owner_id, address) VALUES (?, ?, ?)',
      [name, owner_id, address || null]
    );
    const [newPg] = await db.execute('SELECT * FROM pgs WHERE id = ?', [result.insertId]);
    return newPg[0];
  }
};

module.exports = PG;

