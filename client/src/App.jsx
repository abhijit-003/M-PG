import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PGProvider } from './context/PGContext';
import { TabProvider } from './context/TabContext';
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
import AdminLayout from './components/AdminLayout';
import Tabs from './components/Tabs';
import PGSelector from './components/PGSelector';
import TenantDashboard from './pages/Tenant/Dashboard';
import TenantRentStatus from './pages/Tenant/RentStatus';
import TenantComplaints from './pages/Tenant/Complaints';
import TenantProfile from './pages/Tenant/Profile';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
<PGProvider>
        <TabProvider>
          <Router>
          <div className="app-wrapper">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔥 ADMIN - Split screen layout */}
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout>
                    <Tabs />
                  </AdminLayout>
                </ProtectedRoute>
              } />

              {/* 👤 TENANT - Regular layout */}
              <Route path="/tenant/dashboard" element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  <div className="tenant-layout">
                    <Navbar />
                    <PGSelector />
                    <main className="main-content">
                      <TenantDashboard />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/tenant/rent-status" element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  <div className="tenant-layout">
                    <Navbar />
                    <PGSelector />
                    <main className="main-content">
                      <TenantRentStatus />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/tenant/complaints" element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  <div className="tenant-layout">
                    <Navbar />
                    <PGSelector />
                    <main className="main-content">
                      <TenantComplaints />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/tenant/profile" element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  <div className="tenant-layout">
                    <Navbar />
                    <PGSelector />
                    <main className="main-content">
                      <TenantProfile />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />

              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
          </TabProvider>
      </PGProvider>
    </AuthProvider>
  );
};

export default App;
