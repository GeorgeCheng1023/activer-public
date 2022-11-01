import React from 'react';
import './index.scss';

// eslint-disable
import Button from '../../Button';

export type inputType = {
  id: string
  name?: string,
  label: string,
  inputType?: 'text' | 'password' | 'email' | 'date',
  placeholder: string,
  errorMessage?: string,
  required?: boolean,
  pattern?: string,
};

export interface FormInputProps {
  inputProps: inputType;
  variant?: 'withButton' | 'withoutLabel';
  disabled?: boolean;
  formValue: object;
  onChange: (key: any, value: any) => void;
  buttonText?: string;
}

function FormInput(props: FormInputProps) {
  const {
    inputProps, disabled, variant, buttonText, onChange, formValue,
  } = props;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className={`form-input ${disabled ? 'disabled' : ''}`}>
      <div className={`form-input__label ${variant ? `form-input__label--${variant}` : ''}`}>
        {inputProps.label}
      </div>
      <div className={`form-input__section ${variant ? `form-input__section--${variant}` : ''}`}>
        <input
          id={inputProps.id}
          className="form-input__section__input"
          type={inputProps.inputType}
          placeholder={inputProps.placeholder}
          name={inputProps.name}
          onChange={handleChange}
          value={formValue[inputProps.name as keyof typeof formValue]}
          required={inputProps.required}
          pattern={inputProps.pattern}

        />
        {variant === 'withButton'
          && (
            <div className="form-input__section__button">
              <Button
                color="secondary"
                size="sm"
                text={buttonText}
              />
            </div>
          )}
        <span className="form-input__section__error-Message">{inputProps.errorMessage}</span>
      </div>
    </div>

  );
}

FormInput.defaultProps = {
  variant: undefined,
  buttonText: 'default text',
  disabled: false,

};

export default FormInput;
