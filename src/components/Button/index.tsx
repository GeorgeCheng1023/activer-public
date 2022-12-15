// for extends and setting HTMLButton Attributes:
/* eslint  react/jsx-props-no-spreading: off */
import React from 'react';
import './index.scss';
import { ButtonType } from 'types/components/Button';
import classNames from 'classnames';

function Button({
  color, variant, text, size, iconAfter, iconBefore, ...props
}: ButtonType) {
  const classes = classNames({
    button: true,
    [`button--${color || 'primary'}`]: true,
    'button--outline': variant?.outline,
    'button--round': variant?.round,
    'button--reverse-color': variant?.colorReverse,
    [`button--${size}`]: size,
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
  size: undefined,
  iconAfter: null,
  iconBefore: null,
};

export default Button;
