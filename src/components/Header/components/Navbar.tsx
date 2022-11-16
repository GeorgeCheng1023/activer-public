import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

// components
import Button from '../../Button';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar__item" to="/search">搜尋活動</Link>
      <Link className="navbar__item" to="/">熱門活動</Link>
      <Link to="/user">
        <Button
          color="primary"
          text="登入/註冊"
        />
      </Link>
    </div>
  );
}

export default Navbar;
