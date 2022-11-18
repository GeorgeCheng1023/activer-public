import React from 'react';
// style
import './Navbar.scss';
// redux
import { display } from 'store/searchPanel/searchPanelSlice';
import { useDispatch } from 'react-redux';
// hook
import useAuth from 'hooks/useAuth';
// components
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../Button';

function Navbar() {
  // setting hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } : any = useAuth();

  const handleClick = () => {
    if (!auth.accessToken) {
      navigate('/login', { replace: true });
    } else {
      navigate('/user/basic');
    }
  };

  return (
    <div className="navbar">
      <button type="button" className="navbar__item" onClick={() => dispatch(display())}>搜尋活動</button>
      <Link to="/detail">
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
