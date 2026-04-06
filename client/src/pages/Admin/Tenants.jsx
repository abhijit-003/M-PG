import React, { useState, useEffect } from 'react';
import tenantService from '../../services/tenantService';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', age: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const data = await tenantService.getTenants();
      setTenants(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await tenantService.addTenant(formData);
      setFormData({ full_name: '', age: '', email: '', password: '' });
      setShowModal(false);
      fetchTenants();
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'Error adding tenant');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Manage Tenants</h1>
      <Button onClick={() => setShowModal(true)}>Add Tenant</Button>
      
      <table className="tenants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.id}</td>
              <td>{tenant.full_name}</td>
              <td>{tenant.age}</td>
              <td>{tenant.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Add New Tenant</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Tenant'}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Tenants;
