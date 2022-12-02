import React from 'react';
// style
import './Navbar.scss';
// redux
import { show } from 'store/searchPanel';
// hook
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import { useNavigate, Link } from 'react-router-dom';
import { getUserIsLoggedIn, userLogout } from 'store/userAuth';
import Button from '../../Button';

function Navbar() {
  const userIsLoggined = useAppSelector(getUserIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!userIsLoggined) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <div className="navbar">
      <button type="button" className="navbar__item" onClick={() => dispatch(show())}>搜尋活動</button>
      <Link to="/detail">
        <button type="button" className="navbar__item">熱門活動</button>
      </Link>

      {
        userIsLoggined
        && (
          <div className="navbar__logout-btn">
            <Button
              color="secondary"
              text="登出"
              variant="outline"
              onClick={handleLogout}
            />
          </div>
        )
      }

      <Button
        color="primary"
        text={userIsLoggined ? '個人資料' : '登入/註冊'}
        onClick={handleClick}
      />
    </div>
  );
}

export default Navbar;
