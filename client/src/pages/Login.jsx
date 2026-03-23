import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      const redirectPath = formData.role === 'admin' ? '/admin/dashboard' : '/tenant/dashboard';
      navigate(redirectPath);
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="admin">Admin</option>
          <option value="tenant">Tenant</option>
        </select>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
<Button type="submit">Login</Button>
        {error && <p>{error}</p>}
        <p><a href="/register">Need account? Register</a></p>
      </form>
    </div>
  );
};

export default Login;

