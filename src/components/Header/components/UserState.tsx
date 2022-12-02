/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserState.scss';

// icon
import { MdOutlineLogout, MdLogin } from 'react-icons/md';
import { useAppSelector } from 'hooks/redux';
import { getUserIsLoggedIn, getUserRealname } from 'store/userAuth';

function UserState() {
  const navigate = useNavigate();
  const realName = useAppSelector(getUserRealname);
  const isLoggined = useAppSelector(getUserIsLoggedIn);

  const signOut = async () => {
    navigate('/', { replace: true });
  };

  const hangleLoginClick = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="user-state">
      {
        isLoggined
          ? (
            <>
              <h3>
                Welcome
                <span className="user-state__username">{ realName || 'newbie ' }</span>
                !
              </h3>
            </>
          )
          : <h3>log in</h3>
      }

      {
        isLoggined
          ? (
            <button className="user-state__button" type="button" onClick={signOut}>
              <span className="user-state__icon"><MdOutlineLogout className="user-state__logout" /></span>
            </button>
          )

          : (
            <button className="user-state__button" type="button" onClick={hangleLoginClick}>
              <span className="user-state__icon">
                <MdLogin className="user-state__login" />
              </span>
            </button>
          )
      }
    </div>
  );
}

export default UserState;
