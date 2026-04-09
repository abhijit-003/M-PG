import React from 'react';
import PGDropdown from './PGDropdown';
import { useAuth } from '../hooks/useAuth';

const PGSelector = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-b border-blue-100/50 px-4 py-2.5 shadow-sm sticky top-[64px] z-30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        
      </div>
    </div>
  );
};

export default PGSelector;

