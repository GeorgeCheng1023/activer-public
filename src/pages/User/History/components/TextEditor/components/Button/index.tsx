import React, { Ref } from 'react';

type Props = {
  active: boolean,
  onMouseDown: (event: any) => void,
  children: React.ReactNode
};

const Button = React.forwardRef(
  (
    { onMouseDown, active, children }: Props,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <button
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
