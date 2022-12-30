import React from 'react';
import './index.scss';

export interface NavbarDropdownItemType {
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

export default NavbarDropdownItem;
