import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="split-screen">
        {/* LEFT SIDEBAR - Fixed */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-content">
            <Sidebar />
          </div>
        </aside>
        
        {/* RIGHT CONTENT */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;

