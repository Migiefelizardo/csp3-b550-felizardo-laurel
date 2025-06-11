import React, { useEffect, useState } from 'react';
import { addToCart } from '../services/api';

function ProductsCatalog({ token }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://aecd097kaa.execute-api.us-west-2.amazonaws.com/production/products/active')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.products || []);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  const handleAddToCart = async (productId) => {
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
    <div style={{ padding: 20 }}>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <div
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 20,
        }}
      >
        {products.map(product => (
          <div
            key={product.id || product._id}
            role="listitem"
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 10,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ margin: '10px 0 5px' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold' }}>
              ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </p>
            <p style={{ fontSize: 14, color: '#555' }}>
              {product.description || 'No description available.'}
            </p>
            <button
              onClick={() => handleAddToCart(product._id || product.id)}
              style={{
                marginTop: 10,
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsCatalog;
