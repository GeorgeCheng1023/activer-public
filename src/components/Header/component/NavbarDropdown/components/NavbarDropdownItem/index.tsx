import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

export interface NavbarDropdownItemType {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gotoMenu?: string;
  setMenu?: React.Dispatch<React.SetStateAction<string>>;
  link?: string;
  onClick? :(e: any) => void;
}

function NavbarDropdownItem({
  link,
  children,
  leftIcon,
  rightIcon,
  gotoMenu,
  setMenu,
  onClick,
}: NavbarDropdownItemType) {
  const navigate = useNavigate();

  const handleClick:
  React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (link) {
      navigate(link);
    }
    if (onClick) {
      onClick(e);
    }
    if (gotoMenu && setMenu) {
      setMenu(gotoMenu);
    }
  };

  return (
    <a
      href="/"
      className="navbar__dropdown__item"
      onClick={handleClick}
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
  link: null,
  onClick: undefined,
};

export default NavbarDropdownItem;
