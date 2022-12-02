import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component

import Navbar from './components/Navbar';
import UserState from './components/UserState';

// icon
import IconLogo from '../Icons';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <IconLogo />
        </div>
      </Link>
      <UserState />

      <Navbar />
    </div>
  );
}

export default Header;
