import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import useWindowWidth from 'hooks/window/useWindowWidth';
import Button from 'components/Button';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text: string,
  link?: string,
  color?: 'primary' | 'secondary' | 'success';
  mobileIcon: JSX.Element;
}

function NavbarItem({
  onClick, text, link, mobileIcon, color,
}: Props) {
  const windowWidth = useWindowWidth();

  const renderNavbarButton = () => {
    if (windowWidth > 768) {
      return (
        <button
          type="button"
          className="navbar__item"
          onClick={onClick}
        >
          {text}
        </button>
      );
    }

    return (
      <div className="navbar__item">
        <Button
          color={color}
          variant={{ round: true }}
          iconAfter={mobileIcon}
          onClick={onClick}
        />
        <span>
          {text}
        </span>
      </div>
    );
  };
  if (link) {
    return (
      <Link to={link}>
        {renderNavbarButton()}
      </Link>
    );
  }

  return renderNavbarButton();
}

NavbarItem.defaultProps = {
  onClick: undefined,
  link: undefined,
  color: 'primary',
};

export default NavbarItem;
