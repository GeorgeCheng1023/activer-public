import React from 'react';
import './index.scss';
// component
import useWindowWidth from 'hooks/window/useWindowWidth';
import Navigation, { MobileNavigation } from './component/Navigation';
import Logo from './component/Logo';

function Header() {
  const windowWidth = useWindowWidth();

  return (
    <header className="header">

      {/* Logo */}
      <Logo />

      {windowWidth > 768
        ? (
          // Destop and Laptop Navigation
          <Navigation />
        )
        // Mobile Navigation
        : <MobileNavigation />}

    </header>
  );
}

export default Header;
