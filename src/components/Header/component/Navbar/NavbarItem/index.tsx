import React, { useState, useRef } from 'react';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import useOutsideClick from 'hooks/event/useOutsideClick';

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
  const childrenRef = useRef<HTMLLIElement>(null);
  useOutsideClick(childrenRef, () => setOpen(false));

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

  const classes = classNames({
    navbar__item: true,
    className,
  });

  return (
    <li
      ref={childrenRef}
      className={classes}
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
      <AnimatePresence>
        {open && children}
      </AnimatePresence>
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
