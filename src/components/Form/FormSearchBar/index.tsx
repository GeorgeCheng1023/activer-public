import React from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
  return (
    <div className="searchBar">
      <div className="searchBar__section">
        <FiSearch className="searchBar__icon" />
      </div>

      <input className="searchBar__main" type="text" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
