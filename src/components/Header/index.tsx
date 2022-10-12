import React from 'react';
import Navbar from './components/Navbar';
import './index.scss';

function Header() {
  return (
    <div className="header">
      <div className="logo" />
      <Navbar />
    </div>
  );
}

export default Header;
