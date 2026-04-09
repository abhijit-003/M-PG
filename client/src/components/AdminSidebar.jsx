import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePG } from '../context/PGContext';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { selectedPGs } = usePG();

  // 🔥 Tab mapping from sidebar clicks
  const sidebarTabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'pgs', label: '🏠 PGs', icon: '🏠' },
    { id: 'rooms', label: '🛏️ Rooms', icon: '🛏️' },
    { id: 'tenants', label: '👥 Tenants', icon: '👥' },
    { id: 'bills', label: '💰 Bills', icon: '💰' },
    { id: 'complaints', label: '⚠️ Complaints', icon: '⚠️' }
  ];

  const handleTabClick = (tabId) => {
    // Trigger tab open via custom event (Tabs.jsx listens)
    window.dispatchEvent(new CustomEvent('openTab', { detail: { tabId } }));
    if (tabId === 'dashboard') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="admin-sidebar-content">
      {/* 🏷️ PG Filter */}
      <div className="sidebar-section">
        <h3>Filter by PG</h3>
        <div className="pg-count">
          {selectedPGs.length} PGs selected
        </div>
      </div>

      {/* 📋 Navigation Links */}
      <nav className="sidebar-nav">
        <ul>
          {sidebarTabs.map((tab) => (
            <li key={tab.id} className="sidebar-item">
              <button 
                className="sidebar-link"
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="sidebar-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

