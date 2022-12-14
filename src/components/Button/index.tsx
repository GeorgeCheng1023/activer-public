// for extends and setting HTMLButton Attributes:
/* eslint  react/jsx-props-no-spreading: off */
import React from 'react';
import './index.scss';

interface ButtonVariants {
  outline?: boolean;
  round?: boolean;
  colorReverse?: boolean;
}

export interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'success' | 'dark' | 'white' | 'danger';
  variant?: ButtonVariants;
  size?: 'lg' | 'sm';
  text?: string;
  iconAfter?: JSX.Element;
  iconBefore? : JSX.Element;
}

function Button({
  color, variant, text, size, iconAfter, iconBefore, ...props
}: ButtonType) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`
        button
        button--${color || 'primary'}
        ${variant?.outline ? 'button--outline' : ''}
        ${variant?.round ? 'button--round' : ''}
        ${variant?.colorReverse ? 'button--reverse-color' : ''}
        ${size ? `button--${size}` : ''}
      `}
      {...props}
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
  color: 'primary',
  text: null,
  variant: undefined,
  size: undefined,
  iconAfter: null,
  iconBefore: null,
};

export default Button;
