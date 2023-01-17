import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';
import SideBar from './components/SideBar';
import UserHeader from './components/UserHeader';

// components
export { default as Basic } from './Basic';
export { default as History } from './History';
export { default as Main } from './Main';
export { default as Manage } from './Manage';
export { default as Preferences } from './Preferences';
export { default as Account } from './Account';

function User() {
  return (
    <>
      <UserHeader />
      <SideBar />
      <div className="user__container">
        <div className="user__main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default User;
