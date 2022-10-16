import React from 'react';
import './index.scss';

type Props = {
  buttonColor: string;
  buttonStyle: string;
  buttonText?: string;
};

export const allButtonColor = {
  primary: 'primary',
  secondary: 'secondary',
};

export const allButtonStyle = {
  default: 'default',
  outline: 'outline',
  small: 'small',
};

function ButtonFrame({ buttonColor, buttonStyle, buttonText } : Props) {
  return (
    <button
      className={
        `button
        button--${buttonColor || allButtonColor.primary}--${buttonStyle || allButtonStyle.default}`
      }
      type="button"
    >
      {buttonText}
    </button>
  );
}

ButtonFrame.defaultProps = {
  buttonText: 'default text',
};

export default ButtonFrame;
