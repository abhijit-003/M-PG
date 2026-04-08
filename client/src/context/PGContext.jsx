import React, { createContext, useContext, useState } from 'react';

const PGContext = createContext();

export const usePG = () => {
  const context = useContext(PGContext);
  if (!context) throw new Error('usePG must be used within PGProvider');
  return context;
};

export const PGProvider = ({ children }) => {
  const [selectedPGs, setSelectedPGs] = useState([]);

  const togglePG = (pgId) => {
    setSelectedPGs(prev => 
      prev.includes(pgId)
        ? prev.filter(id => id !== pgId)
        : [...prev, pgId]
    );
  };

  const resetPGs = () => setSelectedPGs([]);

  return (
    <PGContext.Provider value={{ selectedPGs, togglePG, resetPGs }}>
      {children}
    </PGContext.Provider>
  );
};

export default PGContext;

