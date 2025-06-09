import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Felizardo-Laurel Shop</h1>
      <p>Discover and shop your favorite games.</p>
      <Link to="/products" style={{ 
        marginTop: '1rem',
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Browse Products
      </Link>
    </div>
  );
}
