import React from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  placeHolder: string
};

function SearchBar({ inputValue, setInputValue, placeHolder } : Props) {
  function handleSearchButtonClick() {
    console.log(inputValue, 'submitted!');
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar__main"
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
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
