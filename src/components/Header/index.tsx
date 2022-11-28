import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// component
import { AiOutlineMenu } from 'react-icons/ai';
import Navbar from './components/Navbar';
import UserState from './components/UserState';

// icon
import { IconLogoPrimary } from '../Icons';

function Header() {
  const [expended, setExpended] = useState(false);

  const handleToggleNavbar:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setExpended(!expended);
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <IconLogoPrimary />
        </div>
      </Link>
      <UserState />

      <Navbar expended={expended} />

      <button
        type="button"
        className="header__navbar-toggle-button"
        onClick={handleToggleNavbar}
      >
        <AiOutlineMenu />
      </button>

    </div>
  );
}

export default Header;
