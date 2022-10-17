import React from 'react';
import './index.scss';

function ButtonFrame({ color, text, decoration }: ButtonType) {
  return (
    <button
      className={
        `button
        button--${color || 'primary'}--${decoration || 'default'}`
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
