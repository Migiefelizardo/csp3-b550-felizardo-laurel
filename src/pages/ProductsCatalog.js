import React, { useEffect, useState } from 'react';
import { fetchActiveProducts, getUserDetails, getProductById, addToCart } from '../services/api';
import './ProductsCatalog.css';

function ProductsCatalog({ token }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchActiveProducts();
        setProducts(Array.isArray(productsData) ? productsData : productsData.products || []);
        setStatus('success');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const userData = await getUserDetails(token);
        setUser(userData);
      } catch (err) {
        console.error('User not logged in or fetch failed:', err.message);
        setUser(null);
      }
    };

    fetchData();
    fetchUser();
  }, [token]);

  const handleShowDetails = async (productId) => {
    try {
      const productDetails = await getProductById(productId);
      setSelectedProduct(productDetails);
    } catch (err) {
      console.error(err);
      setMessage('Failed to retrieve product details.');
    }
  };

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
        <p
          className={`catalog-message ${
            message.includes('cannot') || message.includes('Failed') ? 'error' : 'success'
          }`}
        >
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
            <button
              onClick={() => handleShowDetails(product._id || product.id)}
              className="catalog-button"
            >
              Show Details
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-details">
          <h3>Product Details</h3>
          <p>
            <strong>Name:</strong> {selectedProduct.name}
          </p>
          <p>
            <strong>Price:</strong> $
            {typeof selectedProduct.price === 'number'
              ? selectedProduct.price.toFixed(2)
              : 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {selectedProduct.description}
          </p>
          {token && user && !user.isAdmin && (
            <button
              onClick={() => handleAddToCart(selectedProduct._id || selectedProduct.id)}
              className="catalog-button"
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsCatalog;
