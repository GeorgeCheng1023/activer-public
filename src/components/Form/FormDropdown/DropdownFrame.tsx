import React, { useState } from 'react';
import { IconArrowUp } from '../../Icons';
import './DropdownFrame.scss';
import options from './options';

type Props = {
  dropdownStyle: string;
  labelText: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
};

export const allDropdownStyle = {
  default: 'default',
  withoutLabel: 'withoutLabel',
};

function DropdownFrame({
  dropdownStyle, labelText, selectedValue, setSelectedValue,
} : Props) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [changeValueTheme, setChangeValueTheme] = useState(false);

  function handleDropdownClick() {
    setToggleDropdown((prevToggleDropdown) => !prevToggleDropdown);
  }

  function handleOptionClick(value: string) {
    setSelectedValue(value);
    handleDropdownClick();
    setChangeValueTheme(true);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      handleDropdownClick();
    }
  }

  return (
    <div className={`dropdown dropdown--${dropdownStyle}`}>
      <div className="dropdown__label">
        {labelText || 'Label'}
      </div>

      <div
        className={`dropdown__selected ${changeValueTheme && 'dropdown__selected--select'}`}
        onClick={handleDropdownClick}
        onKeyDown={(event) => handleKeyPress(event)}
        role="button"
        tabIndex={0}
      >
        {selectedValue || 'Select Choice'}
        <div
          className={`dropdown__selected__icon ${toggleDropdown && 'dropdown__selected__icon--active'}`}
        >
          <IconArrowUp />
        </div>
      </div>

      <div className={`dropdown__option-container ${toggleDropdown && 'dropdown__option-container--active'}`}>

        {options.map((option) => (
          <div
            className="dropdown__option-container__option"
            key={option.id}
            onClick={() => handleOptionClick(option.value)}
            onKeyDown={(event) => handleKeyPress(event)}
            role="button"
            tabIndex={0}
          >
            {option.value}
          </div>
        ))}

      </div>
    </div>
  );
}

export default DropdownFrame;
