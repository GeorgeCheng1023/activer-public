import React, { useState } from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  onSubmit: (inputValue: string) => void,
  placeHolder: string,
  suggestion?: Array<string>,
  disabled?: boolean
};

function FormSearchBar({
  onSubmit, placeHolder, suggestion = [], disabled,
}: Props) {
  // inputValue is a string that text in a input
  const [inputValue, setInputValue] = useState('');
  // suggstionDisplay is a boolean that show or hide the suggestion
  const [suggestionDisplay, setSuggestionDisplay] = useState(false);

  // handle submit search
  const handleSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  // handle input type change event
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuggestionDisplay(true);
    setInputValue(e.target.value);
  };

  // handle keyboard press enter and search
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
      onSubmit((e.target as HTMLInputElement).value);
    }
  };

  // handle search suggestion click
  const handleSuggestionClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputValue((e.target as HTMLButtonElement).innerText);
    setSuggestionDisplay(false);
  };

  // handle blur event when click outside of suggestion
  const handleBlur:React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.relatedTarget) {
      setSuggestionDisplay(false);
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
          onBlur={handleBlur}
          disabled={disabled}
        />
        <button className="button-nostyle searchButton" type="submit" onClick={handleSubmit}>
          <div className="searchBar__section">
            <FiSearch className="searchBar__icon" />
          </div>
        </button>
      </div>
      <div className="suggestion">
        {suggestionDisplay && inputValue && suggestion
          .filter((item : string) => (
            item.includes(inputValue)
          ))
          .slice(0, 5)
          .map((item: string, index: number) => (
            <button
              tabIndex={-1}
              type="button"
              className="suggestion__choice"
              onClick={handleSuggestionClick}
              // eslint-disable-next-line react/no-array-index-key
              key={`suggestion-${index}`}
            >
              {item}
            </button>
          ))}
      </div>
    </div>
  );
}

FormSearchBar.defaultProps = {
  suggestion: [],
  disabled: false,
};

export default FormSearchBar;
