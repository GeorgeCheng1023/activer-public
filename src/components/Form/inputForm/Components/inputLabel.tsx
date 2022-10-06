import React from 'react';
import './inputLabel.scss';

type Props = {
  labelStyle: string
};

function InputLabel({ labelStyle } : Props) {
  return (
    <div className={`inputLabel inputLabel--${labelStyle}`}>
      InputLabel
    </div>
  );
}

export default InputLabel;
