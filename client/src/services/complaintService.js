import api from './api';

export const getComplaints = () => api.get('/complaints');
export const createComplaint = (data) => api.post('/complaints', data);

export default {
  getComplaints,
  createComplaint
};

