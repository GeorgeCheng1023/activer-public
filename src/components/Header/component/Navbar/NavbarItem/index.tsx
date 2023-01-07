import React, { useState } from 'react';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useNavigate } from 'react-router-dom';

interface NavbarItemType {
  label: React.ReactNode;
  link?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  afterIcon?: React.ReactNode;
  className?:string;
}

function NavbarItem({
  label,
  children,
  link,
  onClick,
  afterIcon,
  className,
}: NavbarItemType) {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  const handleClick:
  React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement> = (e) => {
    e.preventDefault();
    if (onClick) { onClick(e); }
    if (link) {
      navigate(link);
      setOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <li
      className={`navbar__item ${className && className}`}
      onMouseEnter={() => { if (windowWidth > 768) { setOpen(true); } }}
      onMouseLeave={() => { if (windowWidth > 768) { setOpen(false); } }}
    >
      <a
        href={link}
        onClick={handleClick}
      >
        {label}
        {afterIcon}
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
  link: null,
  children: null,
  onClick: undefined,
  afterIcon: undefined,
  className: null,
};

export default NavbarItem;
