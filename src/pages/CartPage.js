import React, { useEffect, useState } from 'react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../services/api';

const CartPage = ({ token }) => {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCart = async () => {
    try {
      const data = await getCart(token);
      setCart(data); // ✅ Fix
    } catch (err) {
      console.error(err);
      setMessage('Failed to load cart.');
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const handleQuantityChange = async (productId, newQty) => {
    try {
      const data = await updateQuantity(token, productId, newQty);
      setCart(data); // ✅ Fix
    } catch (err) {
      console.error(err);
      setMessage('Could not update quantity.');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(token, productId);
      setCart(data); // ✅ Fix
    } catch (err) {
      console.error(err);
      setMessage('Could not remove item.');
    }
  };

  const handleClear = async () => {
    try {
      const data = await clearCart(token);
      setCart(data); // ✅ Fix
    } catch (err) {
      console.error(err);
      setMessage('Could not clear cart.');
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {!cart.cartItems || cart.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.cartItems.map(item => (
              <li key={item._id}>
                <h4>{item.productId.name}</h4>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: 
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(item.productId._id, parseInt(e.target.value))
                    }
                    style={{ width: '60px', marginLeft: '0.5rem' }}
                  />
                </p>
                <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
                <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
                <hr />
              </li>
            ))}
          </ul>
          <h3>Total: ${cart.totalPrice.toFixed(2)}</h3>
          <button onClick={handleClear}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
