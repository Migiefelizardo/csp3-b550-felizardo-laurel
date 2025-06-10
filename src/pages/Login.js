import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData, {
        withCredentials: true, // if you're using cookies
      });

      setMessage('Login successful!');
      setUser(res.data.user); // assumes backend returns user info in res.data.user
      navigate('/admin'); // or '/products' based on role
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
