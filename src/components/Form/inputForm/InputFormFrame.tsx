import React from 'react';
import './InputFormFrame.scss';
import InputLabel from './Components/inputLabel';
import InputSection from './Components/inputSection';
import InputHeroSection from './Components/inputHeroSection';

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

function InputFormFrame({ formStyle, labelText } : Props) {
  return (
    <form className={`inputForm inputForm--${formStyle}`}>
      { formStyle === 'heroForm'
        ? (
          <>
            <InputLabel labelStyle={formStyle} labelText={labelText} />
            <InputHeroSection />
          </>
        )
        : (
          <>
            <InputLabel labelStyle={formStyle} labelText={labelText} />
            <InputSection inputSectionStyle={formStyle} />
          </>
        )}
    </form>
  );
}

export default InputFormFrame;
