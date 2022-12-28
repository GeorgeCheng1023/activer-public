import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

interface NavbarDropdownItemType {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gotoMenu?: string;
  setMenu?: React.Dispatch<React.SetStateAction<string>>
}

function NavbarDropdownItem({
  children, leftIcon, rightIcon, gotoMenu, setMenu,
}: NavbarDropdownItemType) {
  return (
    <a
      href="/"
      className="navbar__dropdown__item"
      onClick={(e) => {
        e.preventDefault();
        if (gotoMenu && setMenu) {
          setMenu(gotoMenu);
        }
      }}
    >
      {leftIcon
        && <span className="navbar__dropdown__icon">{leftIcon}</span>}
      {children}
      {rightIcon
        && <span className="navbar__dropdown__icon">{rightIcon}</span>}
    </a>
  );
}

NavbarDropdownItem.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  gotoMenu: null,
  setMenu: undefined,
};

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
