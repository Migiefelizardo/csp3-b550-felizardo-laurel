import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setUser, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>

      <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
        Products
      </NavLink>

      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
        Cart
      </NavLink>

      {user ? (
        <>
          {user.isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
              Admin
            </NavLink>
          )}
          <span className="navbar-user">Hi, {user.firstName}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
            Register
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
