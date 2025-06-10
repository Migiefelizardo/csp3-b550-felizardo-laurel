import { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData); // Debug log

    try {
      await registerUser(formData);
      setMessage('Registration successful! You can now login.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label><br />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          /><br />

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
    </div>
  );
};

export default Register;
