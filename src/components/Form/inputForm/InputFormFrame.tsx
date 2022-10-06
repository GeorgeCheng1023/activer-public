import React from 'react';
import './InputFormFrame.scss';
import InputLabel from './Components/inputLabel';
import InputSection from './Components/inputSection';
import InputHeroSection from './Components/inputHeroSection';

type Props = {
  formStyle: string;
};

export const allInputFormStyle = {
  default: 'default',
  heroForm: 'heroForm',
  disabled: 'disabled',
  withButton: 'withButton',
  withoutLabel: 'withoutLabel',
};

function InputFormFrame({ formStyle } : Props) {
  return (
    <form className="inputForm">
      { formStyle === 'heroForm'
        ? (
          <>
            <InputLabel labelStyle={formStyle} />
            <InputHeroSection />
          </>
        )
        : (
          <>
            <InputLabel labelStyle={formStyle} />
            <InputSection inputSectionStyle={formStyle} />
          </>
        )}
    </form>
  );
}

export default InputFormFrame;
