import React from 'react';
import ButtonFrame from '../../../../Button';
import './index.scss';

type Props = {
  inputSectionStyle: string;
  placeholder: string;
  inputType: string;
  value: string;
  required: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onkeydown?: React.KeyboardEventHandler<HTMLInputElement>;
  buttonText?: string;
};

const Section = React.forwardRef<HTMLInputElement, Props>(
  ({
    inputSectionStyle, placeholder, buttonText, inputType,
    required, value, onBlur, onFocus, onChange, onkeydown,
  }, ref) => (
    <div className="inputSection-container">
      <input
        className={`inputSection inputSection--${inputSectionStyle}`}
        ref={ref}
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onkeydown}
        required={required}
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
  onBlur: undefined,
  onFocus: undefined,
  onkeydown: undefined,
};

export default Section;
