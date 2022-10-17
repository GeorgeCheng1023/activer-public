import React from 'react';
import './index.scss';

function ButtonFrame({ color, text, style }: ButtonType) {
  return (
    <button
      className={
        `button
        button--${color || 'primary'}--${style || 'default'}`
      }
      type="button"
    >
      {text}
    </button>
  );
}

ButtonFrame.defaultProps = {
  buttonText: 'default text',
};

export default ButtonFrame;
