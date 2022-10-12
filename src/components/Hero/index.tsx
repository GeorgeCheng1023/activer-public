import React, { useState } from 'react';
import './index.scss';

// component
import Card from '../Card';
import SearchBar from '../Form/FormSearchBar';

function Hero() {
  const [searchInputValue, setSearchInputValue] = useState('');
  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__left__section">
          <p className="hero__text">
            在這屬於學生的社群中
            <br />
            尋找屬於你的活動
          </p>
        </div>
        <div className="hero__left__section">
          <SearchBar
            inputValue={searchInputValue}
            setInputValue={setSearchInputValue}
            placeHolder="立即搜尋你的活動"
          />
        </div>
      </div>
      <div className="hero__right">
        <Card />
      </div>
    </div>
  );
}

export default Hero;
