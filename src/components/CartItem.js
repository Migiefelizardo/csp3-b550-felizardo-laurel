import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove, user }) => {
  if (!item.productId || typeof item.productId === 'string') {
    return (
      <li className="cart-item">
        <p>Product details missing.</p>
        <button onClick={() => onRemove(item.productId)} disabled={user?.isAdmin}>
          Remove
        </button>
        <hr />
      </li>
    );
  }

  const { _id, name, price } = item.productId;

  const handleChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity >= 1) {
      onQuantityChange(_id, quantity);
    }
  };

  return (
    <li className="cart-item">
      <h4>{name}</h4>
      <p>Price: ${price.toFixed(2)}</p>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleChange}
          disabled={user?.isAdmin}
        />
      </label>
      <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
      <button onClick={() => onRemove(_id)} disabled={user?.isAdmin}>
        Remove
      </button>
      <hr />
    </li>
  );
};

export default CartItem;
