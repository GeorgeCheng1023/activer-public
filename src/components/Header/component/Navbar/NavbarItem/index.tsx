import React, { useState } from 'react';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';

interface NavbarItemType {
  label: string;
  children?: React.ReactNode
}

function NavbarItem({ label, children }: NavbarItemType) {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();

  const handleClick:
  React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <li
      className="navbar__item"
      onBlur={() => setOpen(false)}
      onMouseEnter={() => { if (windowWidth > 768) { setOpen(true); } }}
      onMouseLeave={() => { if (windowWidth > 768) { setOpen(false); } }}
    >
      <a
        href="/"
        onClick={handleClick}
      >
        {label}
        {open && children}
      </a>
    </li>
  );
}

NavbarItem.defaultProps = { children: null };

export default NavbarItem;
