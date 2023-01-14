import React from 'react';
import { IconLogo } from 'components/Icons';
import UserAuth from 'components/Header/component/UserAuth';
import './index.scss';
import { Link } from 'react-router-dom';

function UserHeader() {
  return (
    <header className="user-header">
      <Link to="/" className="user-header__back">
        <IconLogo />
        <div>&#5810; 返回首頁</div>
      </Link>
      <UserAuth />
    </header>
  );
}

export default UserHeader;
