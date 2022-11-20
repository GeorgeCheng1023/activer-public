import React, { useState } from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  onSubmit: (inputValue: string) => void,
  placeHolder: string,
  defaultText?: string,
  disabled?: boolean
};

function FormSearchBar({
  onSubmit, placeHolder, disabled, defaultText,
}: Props) {
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState(defaultText || '');

  // handle submit search
  const handleSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  // handle input type change event
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  // handle keyboard press enter and search
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div
      className="searchBar__container"
    >
      <div className="searchBar">
        <input
          className="searchBar__main"
          type="text"
          placeholder={placeHolder}
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          disabled={disabled}
        />
        <button className="button-nostyle searchButton" disabled={disabled} type="submit" onClick={handleSubmit}>
          <div className="searchBar__section">
            <FiSearch className="searchBar__icon" />
          </div>
        </button>
      </div>
    </div>
  );
}

FormSearchBar.defaultProps = {
  defaultText: undefined,
  disabled: false,
};

export default FormSearchBar;
