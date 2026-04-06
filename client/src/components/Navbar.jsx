import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const adminOptions = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Tenants', to: '/admin/tenants' },
    { label: 'Rooms', to: '/admin/rooms' },
    { label: 'Bills', to: '/admin/bills' },
    { label: 'Complaints', to: '/admin/complaints' }
  ];

  const tenantOptions = [
    { label: 'Dashboard', to: '/tenant/dashboard' },
    { label: 'Rent Status', to: '/tenant/rent-status' },
    { label: 'Complaints', to: '/tenant/complaints' },
    { label: 'Profile', to: '/tenant/profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>PG Management</h1>
      {user ? (
        <div className="navbar-right">
          <Dropdown 
            title={`Welcome, ${user.email}`} 
            options={user.role === 'admin' ? adminOptions : tenantOptions} 
          />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;

