import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Basic from './Basic';
import Account from './Account';
import History from './History';
import Manage from './Manage';
import Preferences from './Preferences';
import SideBar from './components/SideBar';
import Banner from './components/Banner';
import './index.scss';

function User() {
  const [currentText, setCurrentText] = useState('');

  const changeTextHandler = (text: string) => {
    setCurrentText(text);
  };

  return (
    <>
      <Banner text={currentText} />
      <div className="user__container">
        <SideBar onChangeText={changeTextHandler} />
        <div className="user__main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export {
  Basic, Account, History, Manage, Preferences,
};

export default User;
