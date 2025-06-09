import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({ 
          marginRight: '1rem', 
          fontWeight: isActive ? 'bold' : 'normal' 
        })}
      >
        Home
      </NavLink>
      <NavLink to="/register" style={{ marginRight: '1rem' }}>Register</NavLink>
      <NavLink to="/login" style={{ marginRight: '1rem' }}>Login</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  );
};

export default Navbar;

