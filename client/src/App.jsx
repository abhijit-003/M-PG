import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PGProvider } from './context/PGContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminRooms from './pages/Admin/Rooms';
import AdminTenants from './pages/Admin/Tenants';
import PGs from './pages/Admin/PGs';
import AdminBills from './pages/Admin/Bills';
import AdminComplaints from './pages/Admin/Complaints';
import PGSelector from './components/PGSelector';
import TenantDashboard from './pages/Tenant/Dashboard';
import TenantRentStatus from './pages/Tenant/RentStatus';
import TenantComplaints from './pages/Tenant/Complaints';
import TenantProfile from './pages/Tenant/Profile';
import './App.css';

const App = () => {
  return (
    <AuthProvider>      <PGProvider>       <Router>
      <div className="app-wrapper">
        <Navbar />
        <PGSelector />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/rooms" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRooms />
              </ProtectedRoute>
            } />
            <Route path="/admin/tenants" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminTenants />
              </ProtectedRoute>
            } />
            <Route path="/admin/pgs" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PGs />                </ProtectedRoute>
            } />              <Route path="/admin/bills" element={<ProtectedRoute allowedRoles={['admin']}>                  <AdminBills />                </ProtectedRoute>} />              <Route path="/admin/complaints" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminComplaints />
              </ProtectedRoute>
            } />

            {/* Tenant routes */}
            <Route path="/tenant/dashboard" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/tenant/rent-status" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantRentStatus />
              </ProtectedRoute>
            } />
            <Route path="/tenant/complaints" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantComplaints />
              </ProtectedRoute>
            } />
            <Route path="/tenant/profile" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantProfile />
              </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>      </PGProvider>   </AuthProvider>
  );
};

export default App;
