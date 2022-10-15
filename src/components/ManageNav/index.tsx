import React from 'react';
import './index.scss';

// components
import { IconBorderAll } from '../Icons';

type ManageNavProps = {
  title: string;
};

function ManageNav({ title }: ManageNavProps) {
  return (
    <div className="manage-nav noselect">
      <span className="manage-nav__icon">
        <IconBorderAll />
      </span>
      <h3 className="manage-nav__title">
        {title}
      </h3>
    </div>
  );
}

export default ManageNav;
