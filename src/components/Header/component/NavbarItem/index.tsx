import React, { useState } from 'react';

interface NavbarItemType {
  label: string;
  children?: React.ReactNode
}

function NavbarItem({ label, children }: NavbarItemType) {
  const [open, setOpen] = useState(false);

  const handleClick:
  React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <li
      className="navbar__item"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href="/" onClick={handleClick}>
        {label}
      </a>
      {open && children}
    </li>
  );
}

NavbarItem.defaultProps = { children: null };

export default NavbarItem;
