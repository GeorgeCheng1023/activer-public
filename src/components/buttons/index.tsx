import React from 'react';
import './index.scss';

type Props = {
  color : string;
};

export const ButtonColor = {
  default: 'default',
  success: 'success',
  error: 'error',
};

function ButtonFrame({ color } : Props) {
  return (
    <button
      className={`button__frame button--${color || ButtonColor.default}`}
      type="button"
    >
      ButtonFrame
    </button>
  );
}

export default ButtonFrame;
