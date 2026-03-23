import api from './api';

export const getTenants = () => api.get('/tenants');

export default {
  getTenants
};

