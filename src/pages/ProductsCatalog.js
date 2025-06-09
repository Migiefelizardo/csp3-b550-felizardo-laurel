import React, { useEffect, useState } from 'react';

function ProductsCatalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'error', or 'success'

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

  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'error') return <p>Failed to load products.</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div
      role="list"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 20,
        padding: 20,
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
          <img
            src={product.image || 'https://via.placeholder.com/200x150?text=No+Image'}
            alt={product.name || 'Product image'}
            style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 6 }}
            loading="lazy"
          />
          <h3 style={{ margin: '10px 0 5px' }}>{product.name || 'Unnamed product'}</h3>
          <p style={{ fontWeight: 'bold' }}>
            ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
          </p>
          <p style={{ fontSize: 14, color: '#555' }}>
            {product.description || 'No description available.'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductsCatalog;
