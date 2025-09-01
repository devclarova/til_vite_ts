import React from 'react';
import { Wallet } from '../components/shop/Wallet';

const WalletPage = () => {
  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    background: '#fff',
  };
  return (
    <div style={box}>
      <h2>내 지갑</h2>
      <div>
        <Wallet />
      </div>
    </div>
  );
};

export default WalletPage;
