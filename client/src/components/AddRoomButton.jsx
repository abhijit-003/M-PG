import React from 'react';

const AddRoomButton = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`add-room-btn ${className}`}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
        transition: 'all 0.3s ease',
        minHeight: '44px',
        minWidth: '160px',
        whiteSpace: 'nowrap',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>
        ➕ Add New Room
      </span>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: 'left 0.5s',
        zIndex: 1
      }} 
      onMouseEnter={(e) => e.target.style.left = '100%'}
      onMouseLeave={(e) => e.target.style.left = '-100%'} />
    </button>
  );
};

export default AddRoomButton;

