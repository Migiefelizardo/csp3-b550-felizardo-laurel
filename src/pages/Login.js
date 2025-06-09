import { useState } from 'react';
import { loginUser } from '../services/api';

import api from '../services/api'; // same API helper as Register

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);  // adjust endpoint
      setMessage('Login successful!'); 
      // Here, you might want to save tokens or user info, then redirect
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        /><br />

        <label>Password:</label><br />
        <input 
          name="password" 
          type="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        /><br /><br />

        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
