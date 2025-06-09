import { useState } from 'react';
import api from '../services/api'; // We'll create this next

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Update form inputs
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);  // Adjust endpoint to your backend
      setMessage('Registration successful! You can now login.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br />
        <input name="username" value={formData.username} onChange={handleChange} required /><br />

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

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
