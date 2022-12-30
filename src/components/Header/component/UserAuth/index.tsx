import React, { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// redux
import { getUserIsLoggedIn, userLogout } from 'store/userAuth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import Button from 'components/Button';
// style
import './index.scss';

function LoginLogoutButton() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, , removeCookie] = useCookies<string>(['user']);

  const userIsLoggined = useAppSelector(getUserIsLoggedIn);

  // Logout Handler
  const handleLogout = useCallback(() => {
    dispatch(userLogout());
    removeCookie('email', { path: '/' });
    removeCookie('sessionToken', { path: '/' });
    navigate('/');
  }, []);
  // Login Handler
  const handleLoginClick = useCallback(() => {
    if (!userIsLoggined) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  }, []);

  return (
    <div className="navbar__user-auth">
      {
        userIsLoggined
        && (
          <div className="navbar__logout-btn">
            <Button
              color="primary"
              text="登出"
              variant={{ outline: true }}
              onClick={handleLogout}
            />
          </div>
        )
      }

      <div className="navbar__login-button">
        <Button
          color="primary"
          text={userIsLoggined ? '個人資料' : '登入/註冊'}
          onClick={handleLoginClick}
        />
      </div>
    </div>
  );
}

export default LoginLogoutButton;
