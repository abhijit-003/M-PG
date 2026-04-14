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
        <div className="user-actions" style={{ marginLeft: 'auto', marginRight: '30px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontWeight: '500' }}>{user.full_name || user.email}</span>
          <span style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '4px', transition: 'background 0.2s' }}
            onClick={() => {
              const profilePath = user.role === 'admin' ? '/admin/profile' : '/tenant/profile';
              navigate(profilePath);
            }}
            onMouseOver={(e) => e.target.style.background = '#334155'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Profile
          </span>
          <button 
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #94a3b8',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#334155';
              e.target.style.borderColor = '#475569';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#94a3b8';
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/login" className="auth-link" style={{ color: 'white', textDecoration: 'none', padding: '0 0.5rem' }}>
            Login
          </Link>
          <span style={{ color: 'rgb(156 163 175)', padding: '0 0.5rem' }}>|</span>
          <Link to="/register" className="auth-link" style={{ color: 'white', textDecoration: 'none', padding: '0 0.5rem' }}>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


