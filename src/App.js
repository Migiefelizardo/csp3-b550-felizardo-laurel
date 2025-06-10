import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductsCatalog from './pages/ProductsCatalog';
import AdminDashboard from './pages/AdminDashboard'; // Add this if not already
import CartPage from './pages/CartPage'; // Optional if you have it

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <Router>
      {/* ✅ Pass props here */}
      <Navbar user={user} setUser={setUser} setToken={setToken} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} setToken={setToken} />}
        />
        <Route path="/products" element={<ProductsCatalog />} />
        <Route path="/admin" element={<AdminDashboard user={user} token={token} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<CartPage token={token} />} />

      </Routes>
    </Router>
  );
}

export default App;
