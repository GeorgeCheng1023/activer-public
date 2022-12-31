import React from 'react';
import './index.scss';
// component
// import { AiOutlineMenu } from 'react-icons/ai';
import useWindowWidth from 'hooks/window/useWindowWidth';
import Navigation, { MobileNavigation } from './component/Navigation';
import Logo from './component/Logo';
import UserAuth from './component/UserAuth';

function Header() {
  const windowWidth = useWindowWidth();

  return (
    <div className="header">

      {/* Logo */}
      <Logo />

      {/* Desktop and laptop Navigation */}
      {windowWidth > 768
        ? (
          <>
            <Navigation />
            {/* UserAuth: Login/Logout, user interface */}
            <UserAuth />
          </>
        )
        : <MobileNavigation />}

    </div>
  );
}

export default Header;
