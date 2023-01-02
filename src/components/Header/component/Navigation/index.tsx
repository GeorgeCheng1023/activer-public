import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useAppDispatch } from 'hooks/redux';
import { show } from 'store/searchPanel';
import {
  Navbar,
  NavbarItem,
  NavbarDropdown,
  NavbarDropdownMenu,
  NavbarDropdownItem,
} from '..';
import UserAuth from '../UserAuth';

function Navagation() {
  const dispatch = useAppDispatch();

  return (
    <Navbar>
      <NavbarItem
        label="搜尋活動"
        onClick={(e) => {
          e.preventDefault();
          dispatch(show);
        }}
      />
      <NavbarItem label="熱門活動" />
      <NavbarItem label="探索">
        <NavbarDropdown defaultMenu="main">
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

      <UserAuth />

    </Navbar>

  );
}

export function MobileNavigation() {
  return (
    <Navbar>
      <NavbarItem label={<AiOutlineMenu />}>
        <NavbarDropdown defaultMenu="m-main">
          <NavbarDropdownMenu name="m-main" order="primary">
            <NavbarDropdownItem gotoMenu="m-search">搜尋活動</NavbarDropdownItem>
            <NavbarDropdownItem gotoMenu="m-trend">熱門活動</NavbarDropdownItem>
            <NavbarDropdownItem gotoMenu="m-explore">探索</NavbarDropdownItem>
          </NavbarDropdownMenu>
          <NavbarDropdownMenu name="m-explore" order="secondary">
            <NavbarDropdownItem gotoMenu="m-main">Back</NavbarDropdownItem>
            <NavbarDropdownItem>藝術與人文</NavbarDropdownItem>
            <NavbarDropdownItem gotoMenu="m-social">社會科學</NavbarDropdownItem>
          </NavbarDropdownMenu>
          <NavbarDropdownMenu name="m-social" order="third">
            <NavbarDropdownItem gotoMenu="m-explore">Back</NavbarDropdownItem>
            <NavbarDropdownItem>歷史與考古</NavbarDropdownItem>
            <NavbarDropdownItem>哲學</NavbarDropdownItem>
            <NavbarDropdownItem>新聞與傳播</NavbarDropdownItem>
          </NavbarDropdownMenu>
          <UserAuth />
        </NavbarDropdown>
      </NavbarItem>
    </Navbar>

  );
}

export default Navagation;
