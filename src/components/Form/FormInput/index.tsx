import React, { useCallback } from 'react';
import './index.scss';

interface FormInputType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string,
  control?:JSX.Element;
  errorMessage?: string,
  formValue: object | string;
  onChange: (key: any, value: any) => void;
}

function FormInput({
  label, errorMessage, formValue, onChange, control, ...props
}: FormInputType) {
  const handleChange:
  React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    onChange(event.target.name, event.target.value);
  }, []);
  return (
    <div className={`form-input ${props.disabled ? 'disabled' : ''}`}>
      {label
          && (
            <p className="form-input__label">
              {label}
            </p>
          )}
      <div className="form-input__section">
        <input
          {...props}
          className="form-input__section__input"
          onChange={handleChange}
          value={formValue[props.name as keyof typeof formValue]}
        />
        {control}
        <span className="form-input__section__error-Message">{errorMessage}</span>
      </div>
    </div>

  );
}

FormInput.defaultProps = {
  label: undefined,
  errorMessage: undefined,
  control: undefined,
};

export default FormInput;
