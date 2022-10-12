import React from 'react';
import Navbar from './components/Navbar';
import './index.scss';

// icon
import { IconLogoPrimary } from '../Icons';

function Header() {
  return (
    <div className="header">
      <IconLogoPrimary />
      <Navbar />
    </div>
  );
}

export default Header;
