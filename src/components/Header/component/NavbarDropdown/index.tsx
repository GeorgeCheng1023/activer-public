import React, { useState, Children, cloneElement } from 'react';
import useWindowWidth from 'hooks/window/useWindowWidth';
import { motion } from 'framer-motion';
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
      setMenuHeight(height + 10);
    }
  };

  const dropdownVariant = {
    mobileOpen: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
      },
    },
    mobileClosed: {
      opacity: 0,
      x: '100%',
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
      },
    },
    closed: {
      opacity: 0,
      x: 0,
      y: '-100%',
    },
  };

  const dropdownChildren = (
    <>
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
    </>
  );

  if (windowWidth <= 768) {
    return (
      <motion.div
        className="navbar__dropdown"
        initial="mobileClosed"
        animate="mobileOpen"
        exit="mobileClosed"
        style={{
          height: menuHeight || 'fitContent',
        }}
        variants={dropdownVariant}
      >
        { dropdownChildren}
      </motion.div>
    );
  }
  return (
    <div
      className="navbar__dropdown"
      style={{
        height: menuHeight || 'fitContent',
      }}
    >
      { dropdownChildren}
    </div>
  );
}

export default NavbarDropdown;
