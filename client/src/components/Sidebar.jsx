import React from 'react';

const Sidebar = ({ role }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li>Dashboard</li>
        {/* Role-based menu */}
      </ul>
    </aside>
  );
};

export default Sidebar;

