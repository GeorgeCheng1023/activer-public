import React from 'react';
import './index.scss';

export type ButtonType = {
  color?: 'primary' | 'secondary' | 'success';
  variant?: 'outline';
  size?: 'lg' | 'sm';
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
};

function Button({
  color, variant, text, disabled, size, onClick, buttonType, icon,
}: ButtonType) {
  return (
    <button
      /* eslint-disable-next-line react/button-has-type
*/
      type={buttonType}
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
      <span className={`
        
        
        button__icon
        `}
      >
        {icon}
      </span>
    </button>
  );
}

Button.defaultProps = {
  onClick: null,
  color: 'primary',
  buttonType: 'button',
  text: 'Button',
  variant: undefined,
  size: undefined,
  disabled: false,
  icon: null,
};

export default Button;
