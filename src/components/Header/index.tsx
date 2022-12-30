import React, { useCallback, useState } from 'react';
import './index.scss';
// component
import { AiOutlineMenu } from 'react-icons/ai';
import {
  Navbar, NavbarItem, NavbarDropdown, NavbarDropdownMenu, NavbarDropdownItem,
} from './component';
import Logo from './component/Logo';
import UserAuth from './component/UserAuth';

function Header() {
  // mobile support
  const [expended, setExpended] = useState(false);
  const handleBackdropClick = useCallback(() => {
    setExpended(false);
  }, []);
  const handleToggleClick = useCallback(() => {
    setExpended(!expended);
  }, []);
  return (
    <div className="header">

      {/* Logo */}
      <Logo />

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

      <UserAuth />

      {/* Mobile toggle */}
      <button
        type="button"
        className="navbar__toggle-button"
        onClick={handleToggleClick}
      >
        <AiOutlineMenu />
      </button>

      {expended
      && (
        <div
          className="navbar__backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Header;
