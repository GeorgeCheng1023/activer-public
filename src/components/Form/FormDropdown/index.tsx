import React, { useCallback } from 'react';
import './index.scss';

interface FormDropDownType {
  id: string;
  label?: string;
  name: string;
  options: string[];
  value: string;
  onChange: (key: any, value: any) => void;
}

function FormDropDown({
  id,
  label,
  name,
  options,
  value,
  onChange,
}: FormDropDownType) {
  const handleChange:
  React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    document.getElementById(id)?.blur();
    onChange(event.target.name, event.target.value);
  }, []);

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

FormDropDown.defaultProps = {
  label: undefined,
};

export default FormDropDown;
