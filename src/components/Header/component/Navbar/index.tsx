import React from 'react';
import './index.scss';

interface NavbarType {
  children: React.ReactNode;
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

export default Navbar;
