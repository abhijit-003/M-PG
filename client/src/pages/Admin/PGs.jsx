import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getMyPGs, createPG } from '../../services/pgService.js';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const PGs = () => {
  const { user } = useAuth();
  const [pgs, setPgs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      const response = await getMyPGs();
      setPgs(response.data || []);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPG(formData);
      setShowModal(false);
      setFormData({ name: '', address: '' });
      fetchPGs();
    } catch (error) {
      alert('Error creating PG: ' + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">PG Properties</h1>
        <Button onClick={() => setShowModal(true)}>Add PG</Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pgs.map(pg => (
              <tr key={pg.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{pg.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate" title={pg.address}>{pg.address || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(pg.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New PG">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">PG Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address (optional)</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create PG'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PGs;

