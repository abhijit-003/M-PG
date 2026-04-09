import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTabs must be used within TabProvider');
  return context;
};

export const TabProvider = ({ children }) => {
  const [activeTabs, setActiveTabs] = useState(['dashboard']);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const openTab = (tabId) => {
    if (!activeTabs.includes(tabId)) {
      setActiveTabs(prev => [...prev, tabId]);
    }
    setActiveTabIndex(activeTabs.length);
  };

  const closeTab = (tabIndex) => {
    const newTabs = activeTabs.filter((_, i) => i !== tabIndex);
    setActiveTabs(newTabs);
    setActiveTabIndex(Math.max(0, tabIndex - 1));
  };

  const switchTab = (index) => setActiveTabIndex(index);

  return (
    <TabContext.Provider value={{ activeTabs, activeTabIndex, openTab, closeTab, switchTab }}>
      {children}
    </TabContext.Provider>
  );
};

