import React from 'react';
import Rooms from '../pages/Admin/Rooms';
import Dashboard from '../pages/Admin/Dashboard';
import Tenants from '../pages/Admin/Tenants';
import Bills from '../pages/Admin/Bills';
import PGs from '../pages/Admin/PGs';
import Complaints from '../pages/Admin/Complaints';

const TabContent = ({ tabId }) => {
  const components = {
    dashboard: <Dashboard />,
    rooms: <Rooms />,
    tenants: <Tenants />,
    bills: <Bills />,
    pgs: <PGs />,
    complaints: <Complaints />
  };

  return components[tabId] || <div>Component not found: {tabId}</div>;
};

export default TabContent;

