import React from 'react';
import { getUserNickname } from 'store/userAuth';
import { useAppSelector } from 'hooks/redux';
import './index.scss';

function Main() {
  const nickname = useAppSelector(getUserNickname);

  return (
    <div className="user">
      <div className="user__title">
        <h1>Welcome</h1>
        <p>{nickname || 'User'}</p>
      </div>

    </div>
  );
}

export default Main;
