import React from 'react';
import './index.scss';
import Label from './components/Label';
import Section from './components/Section';
import HeroSection from './components/HeroSection';

type Props = {
  formStyle: string;
  labelText: string;
};

export const allInputFormStyle = {
  default: 'default',
  heroForm: 'heroForm',
  disabled: 'disabled',
  withButton: 'withButton',
  withoutLabel: 'withoutLabel',
};

function FormText({ formStyle, labelText }: Props) {
  return (
    <form className={`inputForm inputForm--${formStyle}`}>
      {formStyle === 'heroForm'
        ? (
          <>
            <Label labelStyle={formStyle} labelText={labelText} />
            <HeroSection />
          </>
        )
        : (
          <>
            <Label labelStyle={formStyle} labelText={labelText} />
            <Section inputSectionStyle={formStyle} />
          </>
        )}
    </form>
  );
}

export default FormText;
