import React from 'react';
import { Outlet } from 'react-router-dom';
import Basic from './Basic';
import Account from './Account';
import History from './History';
import Manage from './Manage';
import Preferences from './Preferences';
// import SideBar from './components/SideBar';

function User() {
  return (
    <div className="user">
      <Outlet />
    </div>
  );
}

export {
  Basic, Account, History, Manage, Preferences,
};

export default User;
