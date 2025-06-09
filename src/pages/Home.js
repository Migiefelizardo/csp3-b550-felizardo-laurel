import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Felizardo-Laurel Shop</h1>
      <p>Discover and shop your favorite games.</p>
      <Link to="/products" className="browse-button">
        Browse Products
      </Link>
    </div>
  );
}
