const pgModel = require('../models/pgModel');

const getPGsByOwner = async (ownerId) => {
  return await pgModel.findAllByOwner(ownerId);
};

const createPG = async (pgData, ownerId) => {
  return await pgModel.create({ ...pgData, owner_id: ownerId });
};

module.exports = {
  getPGsByOwner,
  createPG
};

