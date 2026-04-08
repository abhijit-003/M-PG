import api from './api.js';

export const getMyPGs = () => api.get('/pgs');
export const createPG = (pgData) => api.post('/pgs', pgData);

export default {
  getMyPGs,
  createPG
};

