import React, { useState, Children, cloneElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import NavbarDropdownItem, { NavbarDropdownItemType } from '../NavbarDropdownItem';

import './index.scss';

interface NavbarDropdownType {
  children: React.ReactNode;
  name: string;
}

function NavbarDropdown({ children, name }: NavbarDropdownType) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState<number | null>(null);

  const handleEnter = (e: any) => {
    const height = e.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <div
      className="navbar__dropdown"
      style={{
        height: menuHeight || 'fitContent',
      }}
    >
      {Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement<NavbarDropdownItemType>(child)) {
          return child;
        }
        const elementChild: React.ReactElement<NavbarDropdownItemType> = child;

        return React.cloneElement(elementChild, {
          setMenu: setActiveMenu,
        });
      })}

      {/* <CSSTransition
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
      <CSSTransition
        in={activeMenu === 'setting'}
        unmountOnExit
        timeout={500}
        classNames="navbar__dropdown__menu--secondary"
        onEnter={handleEnter}
      >
        <div className="navbar__dropdown__menu">
          <NavbarDropdownItem
            gotoMenu="main"
            setMenu={setActiveMenu}
          >
            Back
          </NavbarDropdownItem>
          <NavbarDropdownItem>Basic</NavbarDropdownItem>
          <NavbarDropdownItem>Safe</NavbarDropdownItem>
        </div>
      </CSSTransition> */}
    </div>
  );
}

export default NavbarDropdown;
