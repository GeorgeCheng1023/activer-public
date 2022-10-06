import React from 'react';
import './DropdownFrame.scss';

type Props = {
  dropdownStyle: string;
  labelText: string;
};

export const allDropdownStyle = {
  default: 'default',
  withoutLabel: 'withoutLabel',
};

function DropdownFrame({ dropdownStyle, labelText } : Props) {
  return (
    <div className={`dropdown dropdown--${dropdownStyle}`}>
      <div className="dropdown__label">
        {labelText}
      </div>
      <select className="dropdown__main">
        <option>Select Choice</option>
        <option>o</option>
        <option>on</option>
        <option>ona</option>
        <option>onan</option>
        <option>onand</option>
        <option>onando</option>
        <option>onandon</option>
      </select>
    </div>
  );
}

export default DropdownFrame;
