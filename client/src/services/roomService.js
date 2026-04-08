import api from './api.js';

export const getRooms = (pgIds = null) => {
  const params = new URLSearchParams();
  if (pgIds && pgIds.length > 0) {
    params.append('pg_ids', pgIds.join(','));
  }
  return api.get(`/rooms?${params.toString()}`);
};

export const createRoom = (roomData) => api.post('/rooms', roomData);

export default {
  getRooms,
  createRoom
};

