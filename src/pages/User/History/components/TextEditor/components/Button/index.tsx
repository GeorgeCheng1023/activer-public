/* eslint-disable react/jsx-props-no-spreading  */
// disable upper rule for undefined properties
import React, { Ref, PropsWithChildren } from 'react';
import { BaseProps } from '../../types';

type Props = PropsWithChildren< {
  active: boolean,
  onMouseDown: (event: any) => void,
  children: React.ReactNode
} & BaseProps>;

const Button = React.forwardRef(
  (
    {
      onMouseDown, active, children, ...props
    }: Props,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <button
      {...props}
      type="button"
      onMouseDown={onMouseDown}
      className={`text-editor__button ${active ? 'active' : ''}`}
      ref={ref}
    >
      {children}
    </button>
  ),
);

export default Button;
