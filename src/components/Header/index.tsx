import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component
import Navbar from './components/Navbar';

// icon
import { IconLogoPrimary } from '../Icons';

function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/home">
        <IconLogoPrimary />
      </Link>
      <Navbar />
    </div>
  );
}

export default Header;
