import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import classNames from 'classnames';

type SidebarLinkProp = {
  text: string,
  url: string,
  icon: React.ReactNode;

};

function SidebarLink({
  text, url, icon,
}: SidebarLinkProp) {
  const location = useLocation();
  const sideBarLinkClassName = classNames({
    'sidebar-link': true,
    active: location.pathname === url,
  });

  return (
    <Link to={url} style={{ textDecoration: 'none' }} className={sideBarLinkClassName}>
      <i className="sidebar-link__icon">
        {icon}
      </i>
      <div className="sidebar-link__text">
        {text}
      </div>

    </Link>

  );
}

export default SidebarLink;
