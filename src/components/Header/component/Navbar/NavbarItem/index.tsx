import React, { useState } from 'react';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';

interface NavbarItemType {
  label: React.ReactNode;
  link?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode
}

function NavbarItem({
  label,
  children,
  link,
  onClick,
}: NavbarItemType) {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();

  const handleClick:
  React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement> = (e) => {
    e.preventDefault();
    if (onClick) { onClick(e); }
    setOpen(!open);
  };

  return (
    <li
      className="navbar__item"
      onMouseEnter={() => { if (windowWidth > 768) { setOpen(true); } }}
      onMouseLeave={() => { if (windowWidth > 768) { setOpen(false); } }}
    >
      <a
        href={link}
        onClick={handleClick}
      >
        {label}
      </a>
      {open && children}
      {(windowWidth <= 768 && open) && (
        <div
          className="navbar__item__backdrop"
          aria-hidden="true"
          onClick={handleClick}
        />
      ) }
    </li>
  );
}

NavbarItem.defaultProps = {
  link: '/',
  children: null,
  onClick: undefined,
};

export default NavbarItem;
