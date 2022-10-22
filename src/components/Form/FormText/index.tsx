import React from 'react';
import './index.scss';
import Label from './components/Label';
import Section from './components/Section';
import HeroSection from './components/HeroSection';

type Props = {
  formStyle: string;
  labelText: string;
  placeholder: string;
  inputType: string;
  value: string;
  required: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>
  buttonText?: string;
};

export const allInputFormStyle = {
  default: 'default',
  heroForm: 'heroForm',
  disabled: 'disabled',
  withButton: 'withButton',
  withoutLabel: 'withoutLabel',
};

const FormText = React.forwardRef<HTMLInputElement, Props>(({
  formStyle, labelText, placeholder, buttonText, inputType,
  required, value, onFocus, onBlur, onChange,
}, ref) => (
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
              inputType={inputType}
              buttonText={buttonText}
              placeholder={placeholder}
              value={value}
              required={required}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onChange}
            />
          </>
        )
    }
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
