import React, { useEffect, useState } from 'react';
import { SlArrowUp as IconArrowUp } from 'react-icons/sl';
import './index.scss';
// import options from './options';

export type dropDownType = {
  label: string;
  name: string;
  options: string[],
  defaultOption?: string;
};

export type FormDropDownType = {
  dropdownProps: dropDownType,
  variant?: 'withoutLabel',
  onChange: (key: any, value: any) => void
};

function FormDropdown({
  dropdownProps, variant, onChange,
}: FormDropDownType) {
  // destructing dropdown props
  const {
    label, name, options, defaultOption,
  } = dropdownProps;

  // init default selected values
  const [selectedOption, setSelectOption] = useState(defaultOption);

  // state for toogle dropdown
  const [displayDropdown, setDisplayDropdown] = useState(false);
  // state for change style className
  const [changeValueTheme, setChangeValueTheme] = useState(false);

  // when selectedOption Change , will pass up bt onChange function
  useEffect(() => {
    onChange(name, selectedOption);
  }, [selectedOption]);

  // toggle dropdown: mouse click
  const handleClickDropdown:
  React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDisplayDropdown(true);
  };
  // toggle dropdwon: keyboard 'Enter' event
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      setDisplayDropdown(false);
    }
  };

  // handle dropdown click and change form value
  const handleChoiceClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
    setDisplayDropdown(false);
    setChangeValueTheme(true);
    setSelectOption((event.target as HTMLInputElement).value);
  };

  const handleBlur:
  React.FocusEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDisplayDropdown(false);
  };

  return (
    <div className={`dropdown dropdown--${variant}`} onBlur={handleBlur}>
      <div className="dropdown__label">
        {label || 'Label'}
      </div>

      <div
        className={`dropdown__selected ${changeValueTheme && 'dropdown__selected--select'}`}
        onClick={handleClickDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {selectedOption || 'Select Choice'}
        <div
          className={`dropdown__selected__icon ${displayDropdown && 'dropdown__selected__icon--active'}`}
        >
          <IconArrowUp />
        </div>

      </div>

      <div className={`dropdown__option-container ${displayDropdown && 'dropdown__option-container--active'}`}>

        {options?.map((option, index) => (
          <input
            className="dropdown__option-container__option"
            type="button"
            id={`dropdown-${name}-option${index}`}
            name={name}
            value={option}
            placeholder={option || 'Choice'}
            onClick={handleChoiceClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}

          />

        ))}

      </div>
    </div>
  );
}

FormDropdown.defaultProps = {
  variant: 'default',
};

export default FormDropdown;
