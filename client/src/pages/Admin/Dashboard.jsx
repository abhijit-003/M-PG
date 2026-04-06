import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Dropdown from '../../components/Dropdown';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>
<p>Dashboard overview. Use top navbar for navigation.</p>
    </div>
  );
};

export default Dashboard;

