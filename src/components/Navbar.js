import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
        Register
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
        Login
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
        Products
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
        Cart
      </NavLink>
    </nav>
  );
};

export default Navbar;
