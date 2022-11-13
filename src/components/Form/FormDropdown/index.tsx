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
  options: Array<optionType>,
  defaultOptionKey?: string;
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
    label, name, options, defaultOptionKey,
  } = dropdownProps;

  // if passin defaultOptionKey  will return Default Value, otherwise return placeorder "請選擇"
  const defaultOptionValue = defaultOptionKey
    ? options.find((option) => option.key === defaultOptionKey)?.value
    : null;

  // init default selected values
  const [selectedOption, setSelectOption] = useState({
    key: defaultOptionKey,
    value: defaultOptionValue,
  });

  // state for toogle dropdown
  const [displayDropdown, setDisplayDropdown] = useState(false);
  // state for change style className
  const [changeValueTheme, setChangeValueTheme] = useState(false);

  // when selectedOption Change , will pass up bt onChange function
  useEffect(() => {
    onChange(name, selectedOption.value);
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
    setSelectOption({
      key: (event.target as HTMLInputElement).id,
      value: (event.target as HTMLInputElement).value,
    });
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
        {selectedOption.value || 'Select Choice'}
        <div
          className={`dropdown__selected__icon ${displayDropdown && 'dropdown__selected__icon--active'}`}
        >
          <IconArrowUp />
        </div>

      </div>

      <div className={`dropdown__option-container ${displayDropdown && 'dropdown__option-container--active'}`}>

        {options?.map((option) => (
          <input
            className="dropdown__option-container__option"
            type="button"
            id={option.key}
            name={name}
            value={option.value}
            placeholder={option.value || 'Choice'}
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
