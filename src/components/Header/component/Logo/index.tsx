import React from 'react';
import { Link } from 'react-router-dom';
import { IconLogo } from 'components/Icons';
import './index.scss';

function Logo() {
  return (
    <Link to="/">
      <div className="header__logo">
        <IconLogo />
      </div>
    </Link>
  );
}

export default Logo;
