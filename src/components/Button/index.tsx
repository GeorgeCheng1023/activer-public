import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonVariantType {
  outline?: boolean;
  round?: boolean;
  colorReverse?: boolean;
}
interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'success' | 'dark' | 'white' | 'danger' | 'transparent';
  variant?: ButtonVariantType;
  text?: string;
  iconAfter?: JSX.Element;
  iconBefore? : JSX.Element;
}

function Button({
  color, variant, text, iconAfter, iconBefore, ...props
}: ButtonType) {
  // Defined: button classes
  const classes = classNames({
    button: true,
    [`button--${color || 'primary'}`]: true,
    'button--outline': variant?.outline,
    'button--round': variant?.round,
    'button--reverse-color': variant?.colorReverse,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classes}
      {...props}
    >
      {iconBefore
      && (
        <span className="button__icon">
          {iconBefore}
        </span>
      )}
      {text}
      {iconAfter
      && (
        <span className="button__icon">
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
  iconAfter: null,
  iconBefore: null,
};

export default Button;
export type { ButtonType };
