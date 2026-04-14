import React from 'react';

import AdminSidebar from './AdminSidebar';

import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  
  if (user?.role !== 'admin') return null;
  
  return <AdminSidebar />;
};

export default Sidebar;

