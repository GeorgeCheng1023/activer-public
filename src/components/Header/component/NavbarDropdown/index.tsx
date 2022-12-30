import React, { useState, Children, cloneElement } from 'react';
import { NavbarDropdownMenuType } from './components/NavbarDropdownMenu';

import './index.scss';

interface NavbarDropdownType {
  children: React.ReactNode;
}

function NavbarDropdown({ children }: NavbarDropdownType) {
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
        if (!React.isValidElement<NavbarDropdownMenuType>(child)) {
          return child;
        }
        const elementChild: React.ReactElement<NavbarDropdownMenuType> = child;

        return cloneElement(elementChild, {
          activeMenu,
          onEnter: handleEnter,
          setActiveMenu,
        });
      })}
    </div>
  );
}

export default NavbarDropdown;
