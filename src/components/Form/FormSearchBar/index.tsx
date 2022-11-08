import React, { useState } from 'react';
import './index.scss';
import { FiSearch } from 'react-icons/fi';

type Props = {
  onSubmit: React.FormEventHandler<HTMLButtonElement | HTMLInputElement>,
  placeHolder: string
};

function SearchBar({ onSubmit, placeHolder }: Props) {
  const [inputValue, setInputValue] = useState('');

  // handle submit search
  const handleSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onSubmit(e);
  };

  // handle input type change event
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  // handel keyboard press enter and search
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  return (
    <>
      <input
        className="searchBar__main"
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
      <button className="button-nostyle searchButton" type="submit" onClick={handleSubmit}>
        <div className="searchBar__section">
          <FiSearch className="searchBar__icon" />
        </div>
      </button>
    </>
  );
}

export default SearchBar;
