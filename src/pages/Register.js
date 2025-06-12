import { useState } from 'react';
import { registerUser } from '../services/api';
import './Register.css';

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
    <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2 className='h2'>Register</h2>
          <div className='register-container'>
            <form onSubmit={handleSubmit}>
              <label>First Name:</label><br />
              <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter your First Name" /><br />

              <label>Last Name:</label><br />
              <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter your Last Name" /><br />

              <label>Email:</label><br />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" /><br />

              <label>Mobile No:</label><br />
              <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} required placeholder="Enter your mobile number" /><br />

              <label>Password:</label><br />
              <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" /><br /><br />

              <button className='register-button' type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
          </div>
      </div>
    </div>
  );
};

export default Register;
