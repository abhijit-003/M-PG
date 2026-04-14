import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
    return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      style={{
        padding: '10px 20px',
        fontSize: '15px',
        minWidth: '100px',
        height: '42px',
        lineHeight: '1.2',
        whiteSpace: 'nowrap',
        borderRadius: '8px',
        fontWeight: '500'
      }}
    >
      {children}
    </button>
  );

};

export default Button;

