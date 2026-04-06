import api from './api';

const tenantService = {
  getTenants: () => api.get('../../tenants'),
  addTenant: (tenantData) => api.post('/tenants', tenantData),
};

export default tenantService;
