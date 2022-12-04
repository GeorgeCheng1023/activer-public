/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
// import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type SidebarLinkProp = {
  text: string,
  url: string,
  icon: React.ReactNode;
  onClickLink: (text: string) => void;
};

function SidebarLink({
  text, url, icon, onClickLink,
}: SidebarLinkProp) {
  const clickHandler = () => {
    onClickLink(text);
  };

  return (
    <Link to={url} style={{ textDecoration: 'none' }} onClick={clickHandler}>
      <div className="sidebar-link">
        <p className="sidebar-link__icon">
          {icon}
        </p>
        <p className="sidebar-link__text">
          {text}
        </p>
      </div>
    </Link>

  );
}

export default SidebarLink;
