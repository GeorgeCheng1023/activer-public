import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component

import Navbar from './components/Navbar';

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

      <Navbar />
    </div>
  );
}

export default Header;
