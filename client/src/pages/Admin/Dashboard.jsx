import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import usePG from '../../hooks/usePG';
import { getMyPGs } from '../../services/pgService';
import Button from '../../components/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { selectedPGs, togglePG } = usePG();
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPGs();
    }
  }, [user]);

  const fetchPGs = async () => {
    try {
      const response = await getMyPGs();
      setPgs(response.data || []);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (selectedPGs.length === 0) {
      alert('Please select at least one PG');
      return;
    }
    window.location.reload();
    console.log('PG Filter applied:', selectedPGs);
  };

  const clearFilter = () => {
    // Simple clear - reload to update
    window.location.reload();
    console.log('Filter cleared');
  };

  if (loading) return <div className="p-6">Loading PGs...</div>;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back, {user?.full_name || user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        <Link to="/admin/rooms" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rooms</h3>
          <p className="text-gray-600">Manage rooms across selected PGs</p>
        </Link>
        <Link to="/admin/tenants" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenants</h3>
          <p className="text-gray-600">View and manage tenants</p>
        </Link>
        <Link to="/admin/bills" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bills</h3>
          <p className="text-gray-600">Generate and track bills</p>
        </Link>
        <Link to="/admin/pgs" className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">PGs</h3>
          <p className="text-gray-600">Manage properties</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

