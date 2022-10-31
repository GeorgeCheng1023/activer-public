import React, { useEffect, useState } from 'react';
import { IconArrowUp } from '../../Icons';
import './index.scss';
// import options from './options';
type optionType = {
  key: string,
  value: string,
};

export type dropDownType = {
  label: string;
  name: string;
  options: Array<optionType>
  defaultValue?: string;
};

export type FormDropDownType = {
  dropdownProps: dropDownType,
  variant?: 'withoutLabel',
  onChange: (key: any, value: any) => void
};

function FormDropDown({
  dropdownProps, variant, onChange,
}: FormDropDownType) {
  // destructing dropdown props
  const {
    label, name, options, defaultKey,
  } = dropdownProps;

  // init default selected values
  const [selectedOption, setSelectOption] = useState({
    key: options.filter((option) => option.value === defaultKey)[0].key,
    value: defaultKey
  });

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [changeValueTheme, setChangeValueTheme] = useState(false);

  useEffect(() => {
    onChange(selectedOption.name, selectedOption.value);
  }, [selectedOption]);
  // toggle dropdown: mouse click
  function handleDropdownClick() {
    setToggleDropdown((prevToggleDropdown) => !prevToggleDropdown);
  }
  // toggle dropdwon: keyboard 'Enter' event
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      handleDropdownClick();
    }
  };

  // handle dropdown click and change form value
  const handleClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
    handleDropdownClick();
    setChangeValueTheme(true);
    setSelectOption({
      key: (event.target as HTMLInputElement).name,
      value: (event.target as HTMLInputElement).value,
    };

    return (
      <div className={`dropdown dropdown--${variant}`}>
        <div className="dropdown__label">
          {label || 'Label'}
        </div>

        <div
          className={`dropdown__selected ${changeValueTheme && 'dropdown__selected--select'}`}
          onClick={handleDropdownClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
          <>
            { || 'Select Choice'}
            <div
              className={`dropdown__selected__icon ${toggleDropdown && 'dropdown__selected__icon--active'}`}
            >
              <IconArrowUp />

            </div>
          </>
        </div>

        <div className={`dropdown__option-container ${toggleDropdown && 'dropdown__option-container--active'}`}>

          {options.map((option) => (
            <input
              className="dropdown__option-container__option"
              type="button"
              id={option.key}
              name={option.key}
              value={option.value}
              placeholder={option.key || 'Choice'}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            />

          ))}

        </div>
      </div>
    );
  }

  FormDropDown.defaultProps = {
    variant: 'default',
  };

  export default FormDropDown;
