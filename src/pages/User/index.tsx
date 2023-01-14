import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

// components
import Basic from './Basic';
import Account from './Account';
import History from './History';
import Main from './Main';
import Manage from './Manage';
import Preferences from './Preferences';
import SideBar from './components/SideBar';
import UserHeader from './components/UserHeader';

function User() {
  return (
    <>
      <UserHeader />
      <div className="user__container">
        <SideBar />
        <div className="user__main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export {
  Basic, Account, History, Manage, Preferences,
  Main,
};

export default User;
