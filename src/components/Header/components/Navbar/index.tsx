import React, { useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
// style
import './index.scss';
// redux
import { getUserIsLoggedIn, userLogout } from 'store/userAuth';
import { show as showSearchPanel } from 'store/searchPanel';
// hook
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import { AiOutlineMenu } from 'react-icons/ai';
import Button from 'components/Button';
import { BsSearch } from 'react-icons/bs';
import { HiFire } from 'react-icons/hi';
import NavbarItem from '../NavbarItem';

// setting hook
function Navbar() {
  const [expended, setExpended] = useState(false);
  const userIsLoggined = useAppSelector(getUserIsLoggedIn);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, , removeCookie] = useCookies<string>(['user']);

  // user login and logout
  const handleLoginClick = useCallback(() => {
    setExpended(false);
    if (!userIsLoggined) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  }, []);
  const handleLogout = useCallback(() => {
    dispatch(userLogout());
    removeCookie('email', { path: '/' });
    removeCookie('sessionToken', { path: '/' });
    navigate('/');
  }, []);

  // mobile support
  const handleBackdropClick = useCallback(() => {
    setExpended(false);
  }, []);
  const handleToggleClick = useCallback(() => {
    setExpended(!expended);
  }, []);

  // navbar item event
  const handleClickSearchActivityButton = useCallback(() => {
    setExpended(false);
    dispatch(showSearchPanel());
  }, []);
  const handleClickTrendButton = useCallback(() => {
    setExpended(false);
  }, []);

  return (
    <nav className="navbar">
      <div
        className={`navbar__container navbar__container${expended ? '--expended' : ''}`}
      >
        <div className="navbar__items">
          <NavbarItem
            onClick={handleClickSearchActivityButton}
            text="搜尋活動"
            mobileIcon={<BsSearch />}
            color="secondary"

          />
          <NavbarItem
            onClick={handleClickTrendButton}
            text="熱門活動"
            link="/detail/1"
            color="success"
            mobileIcon={<HiFire />}
          />
        </div>

        <div className="navbar__user">
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
            {/* <button type="button" onClick={handleLoginClick}>
              <img className="navbar__user-avatar" src="/user.png" alt="user" />
            </button> */}
            <Button
              color="primary"
              text={userIsLoggined ? '個人資料' : '登入/註冊'}
              onClick={handleLoginClick}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="navbar__toggle-button"
        onClick={handleToggleClick}
      >
        <AiOutlineMenu />
      </button>

      {expended
      && (
        <div
          className="navbar__backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </nav>

  );
}

export default Navbar;
