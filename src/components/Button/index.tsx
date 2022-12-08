import React from 'react';
import './index.scss';

export type ButtonType = {
  color?: 'primary' | 'secondary' | 'success' | 'white';
  variant?: 'outline' | 'icon';
  size?: 'lg' | 'sm';
  text?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconAfter?: JSX.Element;
  iconBefore? : JSX.Element;
};

function Button({
  color, variant, text, disabled, size, onClick, buttonType, iconAfter, iconBefore,
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
      {iconBefore
      && (
        <span className={`
        button__icon
        `}
        >
          {iconBefore}
        </span>
      )}
      {text}
      {iconAfter
      && (
        <span className={`
        button__icon
        `}
        >
          {iconAfter}
        </span>
      )}
    </button>
  );
}

Button.defaultProps = {
  onClick: null,
  color: 'primary',
  buttonType: 'button',
  text: null,
  variant: undefined,
  size: undefined,
  disabled: false,
  iconAfter: null,
  iconBefore: null,
};

export default Button;
