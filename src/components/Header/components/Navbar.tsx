import React from 'react';
import './Navbar.scss';
import ButtonFrame, { allButtonColor, allButtonStyle } from '../../buttons';

function Navbar() {
  return (
    <div className="navbar">
      <a href="/">搜尋活動</a>
      <a href="/">熱門活動</a>
      <ButtonFrame buttonColor={allButtonColor.primary} buttonStyle={allButtonStyle.default} buttonText="登入\註冊" />
    </div>
  );
}

export default Navbar;
