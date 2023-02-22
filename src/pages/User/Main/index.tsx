import React from 'react';
import { getUserData } from 'store/user';
import { useAppSelector } from 'hooks/redux';
import './index.scss';

function Main() {
  const userData = useAppSelector(getUserData);

  return (
    <div className="user">
      <div className="user__title">
        <h1>Welcome</h1>
        <p>{userData.nickName || 'User'}</p>
      </div>
    </div>
  );
}

export default Main;
