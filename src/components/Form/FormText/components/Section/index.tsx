import React from 'react';
import ButtonFrame from '../../../../Button';
import './index.scss';

type Props = {
  inputSectionStyle: string;
  buttonText?: string;
};

function Section({ inputSectionStyle, buttonText }: Props) {
  return (
    <div className="inputSection">
      <input
        className={`inputSection inputSection--${inputSectionStyle}`}
        type="text"
        placeholder="Input Placeholder"
      />
      {inputSectionStyle === 'withButton'
        && (
          <div className="inputSection__button">
            <ButtonFrame
              color="secondary"
              decoration="small"
              text=""
            />
          </div>
        )}
    </div>
  );
}

Section.defaultProps = {
  buttonText: 'default text',
};

export default Section;
