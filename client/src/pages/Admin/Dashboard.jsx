import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{user?.full_name || 'N/A'}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{user?.age || 'N/A'}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Total Tenants</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Total Rooms</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

