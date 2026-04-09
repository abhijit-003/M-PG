import React from 'react';

import AdminSidebar from './AdminSidebar';

const Sidebar = ({ role }) => {
  if (role !== 'admin') return null;
  
  return <AdminSidebar />;
};

export default Sidebar;

