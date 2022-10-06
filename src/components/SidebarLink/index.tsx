/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import { BsGearFill } from 'react-icons/bs';

type SidebarLinkProp = {
  labelText: string
};

function SidebarLink({ labelText }: SidebarLinkProp) {
  return (
    <div className="label label--style">
      <BsGearFill className="label__icon label__icon--style" />
      {labelText}
    </div>
  );
}

export default SidebarLink;
