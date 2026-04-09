import React, { useState, useEffect, useRef } from 'react';
import usePG from '../hooks/usePG';
import { getMyPGs } from '../services/pgService';

// ================================
// STYLE CONSTANTS - Easy customization
// ================================
const STYLES = {
  // Button - Compact right-aligned
  button: {
    width: '220px',
    height: '25px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    background: '#2563eb',
    color: 'white',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    cursor: 'pointer',
    position: 'relative',
  },

  // Arrow icon - Small chevron
  arrow: {
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  },

  // Dropdown container - Right aligned overlay
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0px', // Right side positioning
    width: '260px',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 9999,
    maxHeight: '300px',
  },

  // Animation - Smooth open/close
  dropdownAnimation: (isOpen) => ({
    maxHeight: isOpen ? '300px' : '0px',
    opacity: isOpen ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }),

  // List item - Checkbox + PG info
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  },

  // Checkbox - Standard size
  checkbox: {
    marginRight: '10px',
    width: '16px',
    height: '16px',
  },

  // PG name - Bold primary text
  pgName: {
    fontWeight: '500',
    fontSize: '14px',
    color: '#111',
  },

  // PG address - Secondary muted text
  pgAddress: {
    fontSize: '12px',
    color: '#666',
    marginTop: '2px',
  },

  // Action buttons container
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderTop: '1px solid #eee',
    background: '#fafafa',
  },

  // Clear button - Secondary action
  clearBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },

  // Apply button - Primary action
  applyBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },

  // Loading/Empty states
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    color: '#888',
    fontSize: '13px',
  },

  // Container - Right side positioning
  container: {
    position: 'relative',
    display: 'inline-flex',
  }
};

const PGDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedPGs, togglePG } = usePG();
  const dropdownRef = useRef(null);

  // 🔥 Fetch admin PGs on mount
  useEffect(() => {
    fetchPGs();
  }, []);

  // 👆 Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 📡 API - Get user's PGs
  const fetchPGs = async () => {
    try {
      setLoading(true);
      const response = await getMyPGs();
      console.log('✅ PGs loaded:', response.data);
      setPgs(response.data || []);
    } catch (error) {
      console.error('❌ PG fetch failed:', error);
      setPgs([]);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Clear all selections
  const handleClear = () => {
    selectedPGs.forEach(id => togglePG(id));
    setIsOpen(false);
  };

  // ✅ Apply and close
  const handleApply = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div style={STYLES.container}>
        <button style={{...STYLES.button, background: '#f3f4f6', color: '#6b7280'}}>
          Loading PGs...
        </button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} style={STYLES.container}>
      {/* 🔹 BUTTON - Compact right-aligned */}
      <button
        onClick={toggleDropdown}
        style={STYLES.button}
        title="Select PGs"
      >
        PGs ({selectedPGs.length})
        <span style={STYLES.arrow}>⌄</span>
      </button>

      {/* 🔽 DROPDOWN - Right aligned overlay */}
      {isOpen && (
        <div 
          style={{
            ...STYLES.dropdown,
            ...STYLES.dropdownAnimation(isOpen)
          }}
        >
          {/* 📭 EMPTY STATE */}
          {pgs.length === 0 ? (
            <div style={STYLES.emptyState}>
              No PGs found
              <div style={{fontSize: '11px', opacity: 0.7}}>Create your first PG</div>
            </div>
          ) : (
            <>
              {/* 📋 PG LIST */}
              <div style={{maxHeight: '180px', overflowY: 'auto'}}>
                {pgs.map(pg => (
                  <label key={pg.id} style={STYLES.listItem} title={pg.address}>
                    <input
                      type="checkbox"
                      checked={selectedPGs.includes(pg.id)}
                      onChange={() => togglePG(pg.id)}
                      style={STYLES.checkbox}
                    />
                    <div style={{minWidth: 0, flex: 1}}>
                      <div style={STYLES.pgName}>{pg.name}</div>
                      <div style={STYLES.pgAddress}>{pg.address}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* 🎛️ ACTION BUTTONS */}
              {selectedPGs.length > 0 && (
                <div style={STYLES.actions}>
                  <button onClick={handleClear} style={STYLES.clearBtn}>
                    Clear ({selectedPGs.length})
                  </button>
                  <button onClick={handleApply} style={STYLES.applyBtn}>
                    Apply
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PGDropdown;

