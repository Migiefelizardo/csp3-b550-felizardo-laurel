import { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      if (result.message === "User registered successfully") {
        setMessage("Registration successful! You can now login.");
        setFormData({ firstName: '', lastName: '', email: '', mobileNo: '', password: '' });
      } else {
        setMessage(result.message || 'Registration failed.');
      }
    } catch (err) {
      setMessage('An error occurred: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label><br />
          <input name="firstName" value={formData.firstName} onChange={handleChange} required /><br />

          <label>Last Name:</label><br />
          <input name="lastName" value={formData.lastName} onChange={handleChange} required /><br />

          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

          <label>Mobile No:</label><br />
          <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} required /><br />

          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />

          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
