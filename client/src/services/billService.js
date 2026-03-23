import api from './api';

export const getBills = () => api.get('/bills');

export default {
  getBills
};

