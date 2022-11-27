import React from 'react';
// style
import './Navbar.scss';
// redux
import { show } from 'store/searchPanel';
// hook
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/redux';
// components
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../Button';

function Navbar() {
  // setting hook

  const navigate = useNavigate();
  const { auth } : any = useAuth();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!auth.accessToken) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  };

  return (
    <div className="navbar">
      <button type="button" className="navbar__item" onClick={() => dispatch(show())}>搜尋活動</button>
      <Link to="/detail/0">
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
