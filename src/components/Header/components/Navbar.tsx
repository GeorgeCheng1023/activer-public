import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Navbar.scss';

// hook
import useAuth from 'hooks/useAuth';
// components
import Button from '../../Button';

function Navbar() {
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
      <Link className="navbar__item" to="/search">搜尋活動</Link>
      <Link className="navbar__item" to="/detail">熱門活動</Link>
      <Button
        color="primary"
        text="登入/註冊"
        onClick={handleClick}
      />
    </div>
  );
}

export default Navbar;
