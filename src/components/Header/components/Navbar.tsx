import React, { useState } from 'react';
// style
import './Navbar.scss';
// redux
import { getUserIsLoggedIn, userLogout } from 'store/userAuth';
import { show } from 'store/searchPanel';
// hook
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import { AiOutlineMenu } from 'react-icons/ai';
import Button from '../../Button';

// setting hook
function Navbar() {
  const [expended, setExpended] = useState(false);
  const userIsLoggined = useAppSelector(getUserIsLoggedIn);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setExpended(false);
    if (!userIsLoggined) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  };
  const handleBackdropClick = () => {
    setExpended(false);
  };
  const handleToggleClick = () => {
    setExpended(!expended);
  };

  const handleClickSearchActivityButton = () => {
    setExpended(false);
    dispatch(show());
  };
  const handleClickTrendButton = () => {
    setExpended(false);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <div className="navbar">

      <div
        className={`navbar__container navbar__container${expended ? '--expended' : ''} `}
      >
        <button type="button" className="navbar__item" onClick={handleClickSearchActivityButton}>搜尋活動</button>
        <Link to="/detail/1 ">
          <button type="button" className="navbar__item" onClick={handleClickTrendButton}>熱門活動</button>
        </Link>

        <div className="navbar__login-button">
          <Button
            color={userIsLoggined ? 'secondary' : 'primary'}
            text={userIsLoggined ? '個人資料' : '登入/註冊'}
            onClick={handleClick}
          />
        </div>

        {
          userIsLoggined
        && (
          <div className="navbar__logout-btn">
            <Button
              color="primary"
              text="登出"
              variant="outline"
              onClick={handleLogout}
            />
          </div>
        )
        }
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
    </div>

  );
}

export default Navbar;
