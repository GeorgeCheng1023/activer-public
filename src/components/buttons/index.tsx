import React from 'react';
import './index.scss';

type Props = {
  buttonStyle: string;
};

export const allButtonStyle = {
  primary: 'primary',
  secondary: 'secondary',
  primaryOutline: 'primaryOutline',
  secondaryOutline: 'secondaryOutline',
  inputFormButton: 'inputFormButton',
};

function ButtonFrame({ buttonStyle } : Props) {
  return (
    <button
      className={`button button--${buttonStyle || allButtonStyle.primary}`}
      type="button"
    >
      Button
    </button>
  );
}

export default ButtonFrame;
