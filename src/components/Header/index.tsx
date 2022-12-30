import React, { useCallback, useState } from 'react';
import './index.scss';
// component
import { AiOutlineMenu } from 'react-icons/ai';
import Navigation from './component/Navigation';
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
      <Navigation />

      {/* UserAuth: Login/Logout, user interface */}
      <UserAuth />

      {/* Mobile toggle */}
      <button
        type="button"
        className="header__toggle-button"
        onClick={handleToggleClick}
      >
        <AiOutlineMenu />
      </button>

      {expended
      && (
        <div
          className="header__backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Header;
