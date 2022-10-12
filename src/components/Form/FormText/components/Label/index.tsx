import React from 'react';
import './index.scss';

type Props = {
  labelStyle: string;
  labelText: string;
};

function Label({ labelStyle, labelText }: Props) {
  return (
    <div className={`inputLabel inputLabel--${labelStyle}`}>
      {labelText}
    </div>
  );
}

export default Label;
