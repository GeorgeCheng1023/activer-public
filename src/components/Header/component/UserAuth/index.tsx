import React, { useCallback, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import useWindowWidth from 'hooks/window/useWindowWidth';
import useOutsideClick from 'hooks/event/useOutsideClick';
// redux
import { getUserIsLoggedIn, userLogout, getUserPortrait } from 'store/userAuth';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import { HiUser } from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';
import {
  NavbarDropdown, NavbarDropdownItem, NavbarDropdownMenu,
} from '..';
import './index.scss';

function LoginLogoutButton() {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, , removeCookie] = useCookies<string>(['user']);
  const restrictedPage = ['/email/verify', '/email/loading', '/register', '/login'];

  const userIsLoggined = useAppSelector(getUserIsLoggedIn);
  const userPortrait = useAppSelector(getUserPortrait);
  const windowWidth = useWindowWidth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logout Handler
  const handleLogout = useCallback(() => {
    dispatch(userLogout());
    removeCookie('sessionToken', { path: '/' });
    navigate('/');
  }, []);

  // display dropdown
  const [displayUserAuthDroppdown, setDisplayUserAuthDroppdown] = useState(false);
  useOutsideClick(dropdownRef, () => setDisplayUserAuthDroppdown(false));

  // Login Handler
  const handleLogin = () => {
    if (!userIsLoggined) {
      let loginUrl = '/login?next=/';
      if (restrictedPage.includes(location.pathname)) {
        loginUrl = '/login?next=/';
      } else {
        loginUrl = `/login?next=${location.pathname}`;
      }
      navigate(loginUrl);
    } else {
      navigate('/user/basic');
    }
  };

  if (userIsLoggined) {
    return (

      <div
        className="user-auth"
        onMouseEnter={() => {
          if (windowWidth > 768) {
            setDisplayUserAuthDroppdown(true);
          }
        }}
        onMouseLeave={() => {
          if (windowWidth > 768) {
            setDisplayUserAuthDroppdown(false);
          }
        }}
        ref={dropdownRef}
      >
        <Button
          iconAfter={userPortrait ? (
            <img src={userPortrait} alt="user-portrait" />)
            : <HiUser />}
          onClick={() => {
            if (windowWidth <= 768) {
              setDisplayUserAuthDroppdown(true);
            }
          }}
          variant={{ round: true }}
          color="white"
        />
        <AnimatePresence>
          {displayUserAuthDroppdown
            && (
              <NavbarDropdown defaultMenu="user-main">

                <NavbarDropdownMenu name="user-main" order="primary">

                  <NavbarDropdownItem link="/user/basic">基本資料</NavbarDropdownItem>
                  <NavbarDropdownItem link="/user/manage">管理活動</NavbarDropdownItem>
                  <NavbarDropdownItem link="/user/preferences">偏好設定</NavbarDropdownItem>
                  <NavbarDropdownItem link="/user/history">歷史活動</NavbarDropdownItem>
                  <NavbarDropdownItem onClick={handleLogout}>登出</NavbarDropdownItem>
                </NavbarDropdownMenu>

              </NavbarDropdown>
            )}
        </AnimatePresence>
      </div>

    );
  }
  return (
    <div className="user-auth">
      <Button
        text="登入 / 註冊"
        color="white"
        onClick={handleLogin}
      />
    </div>

  );
}

export default LoginLogoutButton;
