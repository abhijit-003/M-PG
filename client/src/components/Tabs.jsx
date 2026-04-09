import React, { useEffect } from 'react';
import { useTabs } from '../context/TabContext';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', component: 'Dashboard' },
  { id: 'rooms', label: 'Rooms', component: 'Rooms' },
  { id: 'tenants', label: 'Tenants', component: 'Tenants' },
  { id: 'bills', label: 'Bills', component: 'Bills' },
  { id: 'pgs', label: 'PGs', component: 'PGs' },
  { id: 'complaints', label: 'Complaints', component: 'Complaints' }
];

const Tabs = () => {
  const { activeTabs, activeTabIndex, openTab, closeTab, switchTab } = useTabs();

  // 🔥 Listen for sidebar tab opens
  useEffect(() => {
    const handleOpenTab = (e) => {
      openTab(e.detail.tabId);
    };
    window.addEventListener('openTab', handleOpenTab);
    return () => window.removeEventListener('openTab', handleOpenTab);
  }, [openTab]);

  return (
    <div className="tabs-wrapper">
      {/* 📋 TAB HEADERS */}
      <div className="tabs-header">
        {activeTabs.map((tabId, index) => {
          const tab = TABS.find(t => t.id === tabId);
          return (
            <div 
              key={tabId} 
              className={`tab-header ${index === activeTabIndex ? 'active' : ''}`}
              onClick={() => switchTab(index)}
            >
              {tab.label}
              <button 
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(index);
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* 📄 TAB CONTENT */}
      <div className="tabs-content">
        {activeTabs.map((tabId, index) => (
          <div 
            key={tabId}
            className={`tab-pane ${index === activeTabIndex ? 'active' : ''}`}
          >
            {/* Placeholder - replace with actual components */}
            <div className="tab-placeholder">
              <h2>{TABS.find(t => t.id === tabId)?.label} Content</h2>
              <p>Tab {index + 1} active</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

