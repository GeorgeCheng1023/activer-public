import React from 'react';
import './index.scss';

function Button({
  color, variant, text, disabled, size,
}: ButtonType) {
  return (
    <button
      type="button"
      className={`
        button
        button--${color || 'primary'}
        ${variant ? `button--${variant}` : ''}
        ${size ? `button--${size}` : ''}
      `}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'default text',
};

export default Button;
