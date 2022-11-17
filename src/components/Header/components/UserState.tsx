/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserState.scss';

// icon
import { MdOutlineLogout, MdLogin } from 'react-icons/md';

// hook
import useAuth from 'hooks/useAuth';
import useLogout from '../../../hooks/useLogout';

function UserState() {
  const navigate = useNavigate();
  const logout = useLogout();

  const { auth } : any = useAuth();
  const state = auth.accessToken;

  const signOut = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const hangleLoginClick = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="user-state">
      {
        state
          ? (
            <>
              {auth.picture && <img className="user-state__portrait" src={auth.picture} alt="" srcSet="" />}
              <h3>
                Welcome
                <span className="user-state__username">{ auth.username }</span>
                !
              </h3>
            </>
          )
          : <h3>log in</h3>
      }

      {state
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
        )}
    </div>
  );
}

export default UserState;
