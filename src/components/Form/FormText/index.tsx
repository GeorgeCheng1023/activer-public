import React from 'react';
import './index.scss';

// components
import Label from './components/Label';
import Section from './components/Section';
import HeroSection from './components/HeroSection';

/*eslint-disable*/
export type FormTextProp = {
  variant: 'default' | 'disabled' | 'withButton' | 'withoutLabel';
  labelText: string;
  placeholder: string;
  inputType: string;
  value: string;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  buttonText?: string;
};

export const FormTextArea = React.forwardRef<HTMLInputElement, FormTextProp>(({
  variant, labelText, placeholder,
}, ref) => (
  <>
    <Label labelStyle={variant} labelText={labelText} />
    <HeroSection placeholder={placeholder} />
  </>
));

const FormText = React.forwardRef<HTMLInputElement, FormTextProp>(({
  variant, labelText, placeholder, buttonText, inputType,
  required, value, onFocus, onBlur, onChange,
}, ref) => (
  <form className={`inputForm inputForm--${variant}`}>
    <Label labelStyle={variant} labelText={labelText} />
    <Section
      inputSectionStyle={variant}
      ref={ref}
      inputType={inputType}
      buttonText={buttonText}
      placeholder={placeholder}
      value={value}
      required={required}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  </form>

));

/*
const FormText = React.forwardRef<HTMLInputElement, Props> (
{ formStyle, labelText, buttonText, placeholder }, ref) => (
    <form className={`inputForm inputForm--${formStyle}`}>
      {
        formStyle === 'heroForm'
          ? (
            <>
              <Label labelStyle={formStyle} labelText={labelText} />
              <HeroSection placeholder={placeholder} />
            </>
          )
          : (
            <>
              <Label labelStyle={formStyle} labelText={labelText} />
              <Section
                inputSectionStyle={formStyle}
                ref={ref}
                buttonText={buttonText}
                placeholder={placeholder}
              />
            </>
          )
      }
    </form>
) */

FormText.defaultProps = {
  buttonText: 'default text',
  onBlur: undefined,
  onFocus: undefined,
};

export default FormText;
