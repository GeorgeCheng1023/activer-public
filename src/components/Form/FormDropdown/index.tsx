import React from 'react';
import './index.scss';

interface FormDropDownType {
  id: string;
  label?: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (key: any, value: any) => void;
  descriptions? : string[];
}

function FormDropDown({
  id,
  label,
  name,
  options,
  value,
  onChange,
  descriptions,
}: FormDropDownType) {
  const handleChange:
  React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault();
    document.getElementById(id)?.blur();
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className="dropdown">
      {label
      && (
        <label
          htmlFor={id}
          className="dropdown__label active"
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
            id={`${name}-option-${index}`}
            value={option}
            key={`${name}-option-${index}`}
            className="dropdown__option"
            title={descriptions && descriptions[index]}
          >
            {option}
          </option>
        ))}

      </select>
    </div>
  );
}

FormDropDown.defaultProps = {
  label: undefined,
  value: undefined,
  descriptions: undefined,
};

export default FormDropDown;
