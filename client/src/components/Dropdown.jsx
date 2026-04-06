import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, options, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <Link 
              key={index} 
              to={option.to} 
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
