import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import ButtonFrame, { allButtonColor, allButtonStyle } from '../../buttons';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar__item" to="/">搜尋活動</Link>
      <Link className="navbar__item" to="/">熱門活動</Link>
      <Link className="navbar__item" to="/">活動搜索</Link>
      <ButtonFrame
        buttonColor={allButtonColor.primary}
        buttonStyle={allButtonStyle.default}
        buttonText="登入/註冊"
      />
    </div>
  );
}

export default Navbar;
