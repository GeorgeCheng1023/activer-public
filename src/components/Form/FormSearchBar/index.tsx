import React from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ inputValue, setInputValue } : Props) {
  function handleSearchButtonClick() {
    console.log(inputValue, 'submitted!');
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar__main"
        type="text"
        placeholder="Search"
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
