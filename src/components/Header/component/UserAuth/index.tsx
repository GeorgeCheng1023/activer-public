import React, { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// redux
import { getUserIsLoggedIn, userLogout, getUserPortrait } from 'store/userAuth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components

import { HiUser } from 'react-icons/hi';
import {
  NavbarItem, NavbarDropdown, NavbarDropdownItem, NavbarDropdownMenu,
} from '..';
import './index.scss';

function LoginLogoutButton() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, , removeCookie] = useCookies<string>(['user']);

  const userIsLoggined = useAppSelector(getUserIsLoggedIn);
  const userPortrait = useAppSelector(getUserPortrait);

  // Logout Handler
  const handleLogout = useCallback(() => {
    dispatch(userLogout());
    removeCookie('email', { path: '/' });
    removeCookie('sessionToken', { path: '/' });
    navigate('/');
  }, []);
  // Login Handler
  const handleLogin = useCallback(() => {
    if (!userIsLoggined) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  }, []);

  if (userIsLoggined) {
    return (
      <NavbarItem
        label={userPortrait ? (
          <img src={userPortrait} alt="user-portrait" />)
          : <HiUser />}
        className="user-auth"
      >
        <NavbarDropdown defaultMenu="user-main">

          <NavbarDropdownMenu name="user-main" order="primary">

            <NavbarDropdownItem link="/user/basic">基本資料</NavbarDropdownItem>
            <NavbarDropdownItem link="/user/manage">管理活動</NavbarDropdownItem>
            <NavbarDropdownItem link="/user/preferences">偏好設定</NavbarDropdownItem>
            <NavbarDropdownItem link="/user/history">歷史活動</NavbarDropdownItem>
            <NavbarDropdownItem onClick={handleLogout}>登出</NavbarDropdownItem>
          </NavbarDropdownMenu>

        </NavbarDropdown>
      </NavbarItem>
    );
  }
  return (
    <NavbarItem
      label="登入 / 註冊"
      onClick={handleLogin}
      className="user-auth"
    />

  );
}

export default LoginLogoutButton;
