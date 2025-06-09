import React, { useEffect, useState } from 'react';

function ProductsCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://aecd097kaa.execute-api.us-west-2.amazonaws.com/production/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        // Assuming API returns { products: [...] }
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      role="list"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            role="listitem"
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={product.image || 'https://via.placeholder.com/200x150?text=No+Image'}
              alt={product.name || 'Product image'}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
              loading="lazy"
            />
            <h3 style={{ margin: '10px 0 5px' }}>{product.name || 'Unnamed product'}</h3>
            <p style={{ fontWeight: 'bold' }}>
              $
              {typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>
              {product.description || 'No description available.'}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductsCatalog;
