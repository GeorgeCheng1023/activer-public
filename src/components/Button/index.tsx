import React from 'react';
import './index.scss';

function ButtonFrame({ color, variant, text }: ButtonType) {

  const classNames: string[] = ['button'];
  switch (variant):
    case 'outline':
      classNames.push('')

      return (
        <button
          className={
            `button
        button--${color || 'primary'}--${variant || 'default'}`
          }
          type="button"
        >
          {text}
        </button>
      );
  }

  ButtonFrame.defaultProps = {
    text: 'default text',
  };

  export default ButtonFrame;
