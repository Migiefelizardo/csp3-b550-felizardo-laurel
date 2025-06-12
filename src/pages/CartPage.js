import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkoutCart,
} from '../services/api';
import CartItem from '../components/CartItem';

const CartPage = ({ token }) => {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        if (token) {
          const cartData = await getCart(token);
          setCart(cartData.cart || { cartItems: [], totalPrice: 0 });

          const res = await fetch('http://localhost:4000/users/details', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error('Failed to fetch user');

          const userData = await res.json();
          setUser(userData);
        } else {
          setCart({ cartItems: [], totalPrice: 0 });
        }
      } catch (err) {
        console.error(err);
        setMessage('Failed to load cart or user.');
      }
    };

    fetchCartAndUser();
  }, [token]);

  const handleQuantityChange = async (productId, newQty) => {
    try {
      const data = await updateQuantity(token, productId, newQty);
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error(err);
      setMessage('Could not update quantity.');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(token, productId);
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error(err);
      setMessage('Could not remove item.');
    }
  };

  const handleClear = async () => {
    try {
      const data = await clearCart(token);
      if (data.cart) setCart(data.cart);
    } catch (err) {
      console.error(err);
      setMessage('Could not clear cart.');
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart(token);
      setCart({ cartItems: [], totalPrice: 0 });
      navigate('/'); // Redirect to homepage
    } catch (err) {
      console.error(err);
      setMessage('Checkout failed.');
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {message && <p className="message">{message}</p>}
      {cart.cartItems && cart.cartItems.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.cartItems.map(item => (
              <CartItem
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </ul>
          <h3>Total: ${cart.totalPrice.toFixed(2)}</h3>
          <div className="cart-buttons">
            {/* Show Checkout button only if user is non-admin */}
            {user && !user.isAdmin && (
              <button onClick={handleCheckout}>Checkout</button>
            )}
            <button onClick={handleClear}>Clear Cart</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
