import React from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  placeHolder: string
};

function SearchBar({ inputValue, setInputValue, placeHolder }: Props) {
  function handleSearchButtonClick() {
    // eslint-disable-next-line no-console
    console.log(inputValue, 'submitted!');
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar__main"
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyUp={(event) => handleKeyPress(event)}
      />
      <button className="button-nostyle searchButton" type="submit" onClick={handleSearchButtonClick}>
        <div className="searchBar__section">
          <FiSearch className="searchBar__icon" />
        </div>
      </button>
    </div>
  );
}

export default SearchBar;
