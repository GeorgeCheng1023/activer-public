import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import NavbarDropdownItem from '../NavbarDropdownItem';
import './index.scss';

function NavbarDropdown() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);

  const handleEnter = (e: any) => {
    const height = e.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <div
      className="navbar__dropdown"
      style={{
        height: menuHeight || 'fitContent',
      }}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="navbar__dropdown__menu--primary"
        onEnter={handleEnter}
      >
        <div className="navbar__dropdown__menu">
          <NavbarDropdownItem>My profile</NavbarDropdownItem>
          <NavbarDropdownItem
            gotoMenu="setting"
            setMenu={setActiveMenu}
          >
            Setting

          </NavbarDropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'setting'}
        unmountOnExit
        timeout={500}
        classNames="navbar__dropdown__menu--secondary"
        onEnter={handleEnter}
      >
        <div className="navbar__dropdown__menu">
          <NavbarDropdownItem
            gotoMenu="main"
            setMenu={setActiveMenu}
          >
            Back
          </NavbarDropdownItem>
          <NavbarDropdownItem>Basic</NavbarDropdownItem>
          <NavbarDropdownItem>Safe</NavbarDropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavbarDropdown;
