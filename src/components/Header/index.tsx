import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component

import {
  Navbar, NavbarItem, NavbarDropdown, NavbarDropdownMenu, NavbarDropdownItem,
} from './component';

// icon
import IconLogo from '../Icons';

function Header() {
  return (
    <div className="header">

      {/* Logo */}
      <Link to="/">
        <div className="header__logo">
          <IconLogo />
        </div>
      </Link>

      {/* Navigation */}
      <Navbar>
        <NavbarItem label="搜尋活動" />
        <NavbarItem label="熱門活動" />
        <NavbarItem label="探索">
          <NavbarDropdown>
            <NavbarDropdownMenu name="main">
              <NavbarDropdownItem>My profile</NavbarDropdownItem>
              <NavbarDropdownItem gotoMenu="setting">Setting</NavbarDropdownItem>
            </NavbarDropdownMenu>
            <NavbarDropdownMenu name="setting">
              <NavbarDropdownItem gotoMenu="main">Back</NavbarDropdownItem>
              <NavbarDropdownItem>Password</NavbarDropdownItem>
            </NavbarDropdownMenu>
          </NavbarDropdown>
        </NavbarItem>
      </Navbar>
    </div>
  );
}

export default Header;
