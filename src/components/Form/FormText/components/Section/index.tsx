import React from 'react';
import ButtonFrame, { allButtonColor, allButtonStyle } from '../../../../Button';
import './index.scss';

type Props = {
  inputSectionStyle: string;
  placeholder: string;
  inputType: string;
  buttonText?: string;
};

const Section = React.forwardRef<HTMLInputElement, Props>(
  ({
    inputSectionStyle, placeholder, buttonText, inputType,
  }, ref) => (
    <div className="inputSection-container">
      <input
        className={`inputSection inputSection--${inputSectionStyle}`}
        ref={ref}
        type={inputType}
        placeholder={placeholder}
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
  ),
);

Section.defaultProps = {
  buttonText: 'default text',
};

export default Section;
