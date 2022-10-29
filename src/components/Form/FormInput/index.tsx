import React from 'react';
import './index.scss';

import Button from '../../Button';

export type FormInputProps = {
  label: string;
  placeholder: string;

  name?: string;
  variant?: 'withButton' | 'withoutLabel';
  disabled?: boolean;
  inputType?: 'text' | 'password' | 'email';
  errorMessage?: string;
  pattern?: string;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  buttonText?: string;
};

// export const FormTextArea = React.forwardRef<HTMLInputElement, FormTextProp>(({
//   variant, labelText, placeholder,
// }, ref) => (
//   <>
//     <Label labelStyle={variant} labelText={labelText} />
//     <HeroSection placeholder={placeholder} />
//   </>
// ));

function FormInput(props: FormInputProps) {
  const {
    disabled, variant, label, buttonText, pattern,
    inputType, placeholder, name, errorMessage,
    onChange, value, required,
  } = props;

  return (
    <div className={`form-input ${disabled ? 'disabled' : ''}`}>
      <div className={`form-input__label form-input__label--${variant}`}>
        {label}
      </div>
      <div className={`form-input__section ${variant ? `form-input__section--${variant}` : ''}`}>
        <input
          className="form-input__section__input"
          type={inputType}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          pattern={pattern}

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
        <span className="form-input__section__error-Message">{errorMessage}</span>
      </div>
    </div>

  );
}

FormInput.defaultProps = {
  variant: undefined,
  buttonText: 'default text',
  inputType: 'text',
  name: 'input',
  errorMessage: 'Something went wrong',
  disabled: false,
  required: false,
  value: undefined,
  onChange: undefined,
  pattern: undefined,
};

export default FormInput;
