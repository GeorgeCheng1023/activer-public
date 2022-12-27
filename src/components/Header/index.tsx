import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component

import Navbar, { NavbarItem } from './component/Navbar';

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

      <Navbar>
        <>
          <NavbarItem label="test" />
          <NavbarItem label="test" />
        </>
      </Navbar>
    </div>
  );
}

export default Header;
