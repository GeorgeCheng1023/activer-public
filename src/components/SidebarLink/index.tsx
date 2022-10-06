/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import { BsGearFill } from 'react-icons/bs';

function SidebarLink() {
  return (
    <div className="label label--style">
      <BsGearFill className="label__icon label__icon--style" />
      Label
    </div>
  );
}

export default SidebarLink;
