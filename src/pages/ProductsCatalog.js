import React, { useEffect, useState } from 'react';
import { addToCart } from '../services/api';
import './ProductsCatalog.css'; // 👈 Import the CSS

function ProductsCatalog({ token }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('http://localhost:4000/products/active');
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const data = await productsRes.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
        setStatus('success');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    const fetchUser = async () => {
      try {
        const userRes = await fetch('http://localhost:4000/users/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        console.error('User not logged in or fetch failed:', err.message);
        setUser(null);
      }
    };

    fetchData();
    if (token) fetchUser();
  }, [token]);

  const handleAddToCart = async (productId) => {
    if (user?.isAdmin) {
      setMessage('Admins cannot add items to the cart.');
      return;
    }

    if (!token) {
      setMessage('You must be logged in to add items to your cart.');
      return;
    }

    try {
      await addToCart(token, productId, 1);
      setMessage('Product added to cart!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to add to cart.');
    }
  };

  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'error') return <p>Failed to load products.</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="catalog-container">
      {message && (
        <p className={`catalog-message ${message.includes('cannot') || message.includes('Failed') ? 'error' : 'success'}`}>
          {message}
        </p>
      )}

      <div className="catalog-grid" role="list">
        {products.map((product) => (
          <div key={product._id || product.id} className="catalog-item" role="listitem">
            <h3>{product.name}</h3>
            <p className="price">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </p>
            <p className="description">{product.description || 'No description available.'}</p>

            {token && user && !user.isAdmin && (
              <button
                onClick={() => handleAddToCart(product._id || product.id)}
                className="catalog-button"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsCatalog;
