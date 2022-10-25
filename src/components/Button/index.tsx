import React from 'react';
import './index.scss';

function Button({
  color, variant, text, disabled, size, onClick,
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
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'default text',
  onClick: null,
};

export default Button;
