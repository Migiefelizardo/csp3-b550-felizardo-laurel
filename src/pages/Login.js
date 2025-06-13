import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserDetails } from '../services/api'; // make sure getUserDetails is exported
import './Login.css';

const Login = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await loginUser(formData); // { access: token }
      const token = data.access;

      // Save token in localStorage and state
      localStorage.setItem('token', token);
      setToken(token);

      const user = await getUserDetails(token); // e.g., { _id, email, isAdmin }
      setUser(user);

      setMessage('Login successful! Redirecting...');
      navigate(user.isAdmin ? '/admin' : '/products'); // ✅ Fixed route

    } catch (err) {
      setMessage(err.message || 'Login failed.');
    }
  };

  return (
    <div className='container' style={{ maxWidth: '400px', margin: 'auto' }} >
      <h2>Login</h2>
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <label>Email:</label><br />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          /><br />

          <label>Password:</label><br />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          /><br /><br />

          <button className='login-button' type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
