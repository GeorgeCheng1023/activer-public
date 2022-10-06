import React from 'react';
import ButtonFrame, { allButtonColor, allButtonStyle } from '../../../buttons';
import './inputSection.scss';

type Props = {
  inputSectionStyle: string;
};

function InputSection({ inputSectionStyle } : Props) {
  return (
    <div className="inputSection">
      <input
        className={`inputSection inputSection--${inputSectionStyle}`}
        type="text"
        placeholder="Input Placeholder"
      />
      { inputSectionStyle === 'withButton'
        && (
          <div className="inputSection__button">
            <ButtonFrame
              buttonColor={allButtonColor.secondary}
              buttonStyle={allButtonStyle.small}
            />
          </div>
        )}
    </div>
  );
}

export default InputSection;
