import React from 'react';
import ButtonFrame, { allButtonColor, allButtonStyle } from '../../../../Button';
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
              buttonColor={allButtonColor.secondary}
              buttonStyle={allButtonStyle.small}
              buttonText={buttonText}
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
