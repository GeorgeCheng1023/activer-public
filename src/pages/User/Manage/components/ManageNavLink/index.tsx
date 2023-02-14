import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface ManageNavLinkType {
  name: string;
  icon: React.ReactNode;
}

function ManageNavLink({ name, icon }: ManageNavLinkType) {
  return (
    <NavLink
      to={`/user/manage/${name}`}
      className={({ isActive }) => (isActive ? 'manage__nav--active' : 'manage__nav')}
    >
      {icon}
      {name}
    </NavLink>
  );
}

export default ManageNavLink;
