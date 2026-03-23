import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '', age: '', role: 'tenant' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      await login(formData);
      navigate('/tenant/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <h1>Register as Tenant</h1>
      <p><a href="/login">Already have account? Login</a></p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
        <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})} required />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <Button type="submit">Register</Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;

