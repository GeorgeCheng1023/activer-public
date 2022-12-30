import React, { Children, cloneElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavbarDropdownItemType } from '../NavbarDropdownItem';
import './index.scss';

export interface NavbarDropdownMenuType {
  children: React.ReactNode;
  name: string;
  activeMenu?: string;
  order: 'primary' | 'secondary';
  onEnter?: (e: any) => void;
  setActiveMenu? : React.Dispatch<React.SetStateAction<string>>
}

function NavbarDropdownMenu({
  children, name, activeMenu, order, onEnter, setActiveMenu,
}: NavbarDropdownMenuType) {
  return (
    <CSSTransition
      in={activeMenu === name}
      unmountOnExit
      timeout={500}
      classNames={`navbar__dropdown__menu--${order}`}
      onEnter={onEnter}
    >
      <div className="navbar__dropdown__menu">
        {Children.map(children, (child: React.ReactNode) => {
          if (!React.isValidElement<NavbarDropdownItemType>(child)) {
            return child;
          }
          const elementChild: React.ReactElement<NavbarDropdownItemType> = child;

          return cloneElement(elementChild, {
            setMenu: setActiveMenu,
          });
        })}
      </div>
    </CSSTransition>
  );
}

NavbarDropdownMenu.defaultProps = {
  activeMenu: '',
  onEnter: undefined,
  setActiveMenu: undefined,
};

export default NavbarDropdownMenu;
