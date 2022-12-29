import React from 'react';
import { CSSTransition } from 'react-transition-group';

function NavbarDropdownMenu() {
  return (
    <CSSTransition
      in={activeMenu === 'main'}
      unmountOnExit
      timeout={500}
      classNames="navbar__dropdown__menu--primary"
      onEnter={handleEnter}
    >
      <div className="navbar__dropdown__menu">
        <NavbarDropdownItem>My profile</NavbarDropdownItem>
        <NavbarDropdownItem
          gotoMenu="setting"
          setMenu={setActiveMenu}
        >
          Setting

        </NavbarDropdownItem>
      </div>
    </CSSTransition>
  );
}

export default NavbarDropdownMenu;
