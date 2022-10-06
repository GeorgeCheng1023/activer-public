import React from 'react';
import './inputLabel.scss';

type Props = {
  labelStyle: string;
  labelText: string;
};

function InputLabel({ labelStyle, labelText } : Props) {
  return (
    <div className={`inputLabel inputLabel--${labelStyle}`}>
      {labelText}
    </div>
  );
}

export default InputLabel;
