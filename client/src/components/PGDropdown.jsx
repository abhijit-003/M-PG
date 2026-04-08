import React, { useState, useEffect, useRef } from 'react';
import usePG from '../hooks/usePG';
import { getMyPGs } from '../services/pgService';

const PGDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedPGs, togglePG } = usePG();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchPGs();
  }, []);

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

  const fetchPGs = async () => {
    try {
      setLoading(true);
      const response = await getMyPGs();
      console.log('PGs response:', response);
      setPgs(response.data || []);
    } catch (error) {
      console.error('Error fetching PGs:', error);
      setPgs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    selectedPGs.forEach(id => togglePG(id));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <div className="relative inline-block">
        <button className="bg-gray-200 text-gray-600 px-2.5 py-1.5 rounded text-xs font-medium h-7 flex items-center justify-center min-w-[60px]">
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded flex items-center gap-1 text-xs font-semibold shadow transition-all duration-200 min-w-[60px] h-7 border hover:border-blue-300"
        onClick={toggleDropdown}
      >
        PGs ({selectedPGs.length})
        <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]">
          {pgs.length === 0 ? (
            <div className="p-3 text-center text-gray-500 text-xs">
              No PGs found
            </div>
          ) : (
            <div className="max-h-48 overflow-auto">
              {pgs.map(pg => (
                <label key={pg.id} className="flex items-center p-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-xs">
                  <div className="min-w-0 flex-1 truncate">
                  <input
                    type="checkbox"
                    checked={selectedPGs.includes(pg.id)}
                    onChange={() => togglePG(pg.id)}
                    className="h-3.5 w-3.5 text-blue-600 rounded mr-2"
                  />
                  
                    <span className="font-medium text-gray-900 truncate">{pg.name}</span>
                    <span className="text-gray-500 truncate max-w-[120px]"> | {pg.address}</span>
                  </div>
                </label>
              ))}
              {selectedPGs.length > 0 && (
                <div className="border-t border-gray-100 p-2">
                  <button 
                    className="w-full text-left p-1.5 text-red-600 hover:bg-red-50 rounded text-xs font-medium"
                    onClick={handleClear}
                  >
                    Clear all ({selectedPGs.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PGDropdown;
