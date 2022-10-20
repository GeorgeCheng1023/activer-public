/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
// import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type SidebarLinkProp = {
  text: string,
  url: string,
  icon: React.ReactNode;
};

function SidebarLink({ text, url, icon }: SidebarLinkProp) {
  return (

    <Link to={url} style={{ textDecoration: 'none' }}>
      <div className="sidebar-link">
        <div className="sidebar-link__icon">
          {icon}
        </div>
        <div className="sidebar-link__text">
          {text}
        </div>
      </div>
    </Link>

  );
}

export default SidebarLink;
