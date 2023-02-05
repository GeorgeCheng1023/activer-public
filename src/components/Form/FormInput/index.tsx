import React, { useEffect, useState } from 'react';
import './index.scss';

interface FormInputType
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string,
  control?: JSX.Element;
  errorMessage?: string,
  formValue: object | string;
  onChange: (key: any, value: any) => void;
}

function FormInput({
  label, errorMessage, formValue, onChange, control, ...props
}: FormInputType) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.name, event.target.value);
    if (event.target.validity.patternMismatch) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  useEffect(() => {
    if (props.type === 'date' || props.placeholder) {
      document.getElementById(`from-input__label-${props.id}`)?.classList.add('active');
    }
  }, []);

  return (
    <div className={`form-input ${props.disabled ? 'disabled' : ''}`}>
      <div className="form-input__container">
        <input
          {...props}
          placeholder={props.placeholder ? props.placeholder : ''}
          className="form-input__input"
          onFocus={() => {
            document.getElementById(`from-input__label-${props.id}`)?.classList.add('active');
          }}
          onBlur={() => {
            const getLabel = document.getElementById(`from-input__label-${props.id}`);
            if (formValue[props.name as keyof typeof formValue] === '' && !(props.type === 'date')) {
              getLabel?.classList.remove('active');
              setShowErrorMessage(false);
            }
          }}
          onChange={handleChange}
          value={formValue[props.name as keyof typeof formValue]}
        />
        {label
          && (
            <label
              id={`from-input__label-${props.id}`}
              htmlFor={props.id}
              className="form-input__label"
            >
              {label}
            </label>
          )}
        {control}
      </div>

      {showErrorMessage
        && (
          <span
            className="form-input__error-message"
            id={`form-input__error-message-${props.id}`}
          >
            {errorMessage}
          </span>
        )}
    </div>

  );
}

FormInput.defaultProps = {
  label: undefined,
  errorMessage: undefined,
  control: undefined,
};

export default FormInput;
