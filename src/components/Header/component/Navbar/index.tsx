import React from 'react';
import './index.scss';

interface NavbarType {
  children: JSX.Element;
}

function Navbar({ children }: NavbarType) {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">
        {children}
      </ul>
    </nav>
  );
}

interface NavbarItemType {
  label: string;

}

export function NavbarItem({ label } : NavbarItemType) {
  return (
    <li className="navbar__item">
      <a href="/">
        {label}
      </a>
    </li>
  );
}

export default Navbar;
