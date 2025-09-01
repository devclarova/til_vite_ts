import React from 'react';
import Cart from '../components/shop/Cart';

const CartPage = () => {
  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    background: '#fff',
  };
  return (
    <div style={box}>
      <h2>장바구니</h2>
      <div>
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
