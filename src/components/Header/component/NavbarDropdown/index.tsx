import React, { useState, Children, cloneElement } from 'react';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { NavbarDropdownMenuType } from './components/NavbarDropdownMenu';
import './index.scss';

interface NavbarDropdownType {
  children: React.ReactNode;
  defaultMenu: string;
}

function NavbarDropdown({ children, defaultMenu }: NavbarDropdownType) {
  const [activeMenu, setActiveMenu] = useState(defaultMenu);
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  const handleEnter = (e: any) => {
    const height = e.offsetHeight;
    if (windowWidth > 768) {
      setMenuHeight(height);
    }
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
