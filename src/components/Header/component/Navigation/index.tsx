import React from 'react';
import {
  Navbar,
  NavbarItem,
  NavbarDropdown,
  NavbarDropdownMenu,
  NavbarDropdownItem,
} from '..';

function Navagation() {
  return (
    <Navbar>
      <NavbarItem label="搜尋活動" />
      <NavbarItem label="熱門活動" />
      <NavbarItem label="探索">
        <NavbarDropdown>
          <NavbarDropdownMenu name="main" order="primary">
            <NavbarDropdownItem gotoMenu="art">藝術人文</NavbarDropdownItem>
            <NavbarDropdownItem gotoMenu="social">社會科學</NavbarDropdownItem>
          </NavbarDropdownMenu>
          <NavbarDropdownMenu name="art" order="secondary">
            <NavbarDropdownItem gotoMenu="main">Back</NavbarDropdownItem>
            <NavbarDropdownItem>平面設計</NavbarDropdownItem>
            <NavbarDropdownItem>電腦繪圖</NavbarDropdownItem>
          </NavbarDropdownMenu>
          <NavbarDropdownMenu name="social" order="secondary">
            <NavbarDropdownItem gotoMenu="main">Back</NavbarDropdownItem>
            <NavbarDropdownItem>歷史與考古</NavbarDropdownItem>
            <NavbarDropdownItem>哲學</NavbarDropdownItem>
            <NavbarDropdownItem>新聞與傳播</NavbarDropdownItem>
          </NavbarDropdownMenu>
        </NavbarDropdown>
      </NavbarItem>
    </Navbar>

  );
}

export default Navagation;
