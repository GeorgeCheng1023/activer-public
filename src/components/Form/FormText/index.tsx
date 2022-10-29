import React from 'react';
import './index.scss';

// components
import Label from './components/Label';
import Section from './components/Section';
import HeroSection from './components/HeroSection';

const FormText = React.forwardRef<HTMLInputElement, FormTextProp>(({
  formStyle, labelText, placeholder, buttonText, inputType,
  required, value, onFocus, onBlur, onChange,
}, ref) => (
  <section className={`inputForm inputForm--${formStyle}`}>
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
  </section>

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
