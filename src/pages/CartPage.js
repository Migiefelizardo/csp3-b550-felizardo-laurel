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
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(token);
        if (data.cart) {
          setCart(data.cart);
        } else {
          setCart({ cartItems: [], totalPrice: 0 });
        }
      } catch (err) {
        console.error(err);
        setMessage('Failed to load cart.');
      }
    };

    if (token) fetchCart();
  }, [token]);

  const handleQuantityChange = async (productId, newQty) => {
    try {
      const data = await updateQuantity(token, productId, newQty);
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error(err);
      setMessage('Could not update quantity.');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(token, productId);
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error(err);
      setMessage('Could not remove item.');
    }
  };

  const handleClear = async () => {
    try {
      const data = await clearCart(token);
      if (data.cart) {
        setCart(data.cart);
      }
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
            <button onClick={handleCheckout}>Checkout</button>
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
