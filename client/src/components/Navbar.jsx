import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import PGDropdown from './PGDropdown';


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
    <nav
  className="navbar"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    zIndex: 1000
  }}
>
      <h1>PG Management</h1>

      {user ? (
        <div className="navbar-right">
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;


