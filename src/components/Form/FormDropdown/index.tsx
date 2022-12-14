import React from 'react';
import './index.scss';

interface DropdownType {
  id: string;
  label?: string;
  name: string;
  options: string[];
}

interface Props {
  dropdownProps: DropdownType,
  value: string;
  onChange: (key: any, value: any) => void;
}

function FormDropDown({
  value,
  dropdownProps,
  onChange,
}: Props) {
  const {
    id,
    label,
    name,
    options,
  } = dropdownProps;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    document.getElementById(id)?.blur();
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className="dropdown">
      {label
      && (
        <label
          htmlFor={id}
          className="dropdown__label"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        className="dropdown__select"
        onChange={handleChange}
        value={value}
      >
        {options.map((option: string, index: number) => (
          <option
            value={option}
            key={`${name}-option-${index}`}
            className="dropdown__option"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormDropDown;
