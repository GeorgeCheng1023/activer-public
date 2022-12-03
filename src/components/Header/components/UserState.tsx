/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import './UserState.scss';

// icon
import { useAppSelector } from 'hooks/redux';
import { getUserIsLoggedIn, getUserRealname } from 'store/userAuth';
import { Link } from 'react-router-dom';

function UserState() {
  const realName = useAppSelector(getUserRealname);
  const isLoggined = useAppSelector(getUserIsLoggedIn);

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
          : <Link to="/login">Log in</Link>
      }
    </div>
  );
}

export default UserState;
