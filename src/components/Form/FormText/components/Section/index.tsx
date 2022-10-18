import React from 'react';
import ButtonFrame from '../../../../Button';
import './index.scss';

type Props = {
  inputSectionStyle: string;
  placeholder: string;
  inputType: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  buttonText?: string;
};

const Section = React.forwardRef<HTMLInputElement, Props>(
  ({
    inputSectionStyle, placeholder, buttonText, inputType, value, handleChange,
  }, ref) => (
    <div className="inputSection-container">
      <input
        className={`inputSection inputSection--${inputSectionStyle}`}
        ref={ref}
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      {inputSectionStyle === 'withButton'
        && (
          <div className="inputSection__button">
            <ButtonFrame
              color="secondary"
              size="sm"
              text={buttonText}
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
