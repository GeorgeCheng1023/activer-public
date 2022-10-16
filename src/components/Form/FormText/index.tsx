import React from 'react';
import './index.scss';
import Label from './components/Label';
import Section from './components/Section';
import HeroSection from './components/HeroSection';

type Props = {
  formStyle: string;
  labelText: string;
  buttonText?: string;
};

export const allInputFormStyle = {
  default: 'default',
  heroForm: 'heroForm',
  disabled: 'disabled',
  withButton: 'withButton',
  withoutLabel: 'withoutLabel',
};

function FormText({ formStyle, labelText, buttonText }: Props) {
  return (
    <form className={`inputForm inputForm--${formStyle}`}>
      {
        formStyle === 'heroForm'
          ? (
            <>
              <Label labelStyle={formStyle} labelText={labelText} />
              <HeroSection />
            </>
          )
          : (
            <>
              <Label labelStyle={formStyle} labelText={labelText} />
              <Section inputSectionStyle={formStyle} buttonText={buttonText} />
            </>
          )
      }
    </form>
  );
}

FormText.defaultProps = {
  buttonText: 'default text',
};

export default FormText;
