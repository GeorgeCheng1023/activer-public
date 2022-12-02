import React from 'react';
// style
import './Navbar.scss';
// redux
import { show } from 'store/searchPanel';
// hook
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// components
import { useNavigate, Link } from 'react-router-dom';
import { getUserIsLoggedIn } from 'store/userAuth';
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

  return (
    <div className="navbar">
      <button type="button" className="navbar__item" onClick={() => dispatch(show())}>搜尋活動</button>
      <Link to="/detail/1">
        <button type="button" className="navbar__item">熱門活動</button>
      </Link>
      <Button
        color="primary"
        text="登入/註冊"
        onClick={handleClick}
      />
    </div>
  );
}

export default Navbar;
