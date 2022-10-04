import React from 'react';
import './index.scss';

type Props = {
  buttonColor: string;
  buttonStyle: string;
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

function ButtonFrame({ buttonColor, buttonStyle } : Props) {
  return (
    <button
      className={
        `button
        button--${buttonColor || allButtonColor.primary}--${buttonStyle || allButtonStyle.default}`
      }
      type="button"
    >
      Button
    </button>
  );
}

export default ButtonFrame;
