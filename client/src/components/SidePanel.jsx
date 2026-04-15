import React from 'react';

const SidePanel = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Blur backdrop - full screen */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={onClose}
      />
      
      {/* Rectangle right panel - larger, better positioned */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          right: '30%',
          transform: 'translateY(-50%)',
          width: '600px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          minHeight: '300px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 35px 80px rgba(0, 0, 0, 0.35)',
          zIndex: 1000,
          overflow: 'hidden',
          animation: 'slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.75rem 2rem',
            borderBottom: '1px solidrgb(15, 39, 88)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <h2 
            style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}
          >
            {title}
          </h2>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.75rem',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '0.75rem',
              borderRadius: '12px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
          >
            ×
          </button>
        </div>
        
        {/* Scrollable content - better padding */}
        <div 
          style={{
            padding: '2rem',
            height: 'calc(85vh - 120px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain'
          }}
        >
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateY(-50%) translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        /* Smooth scroll */
        * {
          scrollbar-width: thin;
        }
        *::-webkit-scrollbar {
          width: 6px;
        }
        *::-webkit-scrollbar-track {
          background: #f1f5f9;
          borderRadius: 3px;
        }
        *::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          borderRadius: 3px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default SidePanel;

