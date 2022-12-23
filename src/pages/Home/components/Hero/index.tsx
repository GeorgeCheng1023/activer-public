import React from 'react';
import './index.scss';

// component
import SearchBar from 'components/Form/FormSearchBar';

function Hero() {
  // handle search bar submit
  const handleSubmit = (inputValue: String) => {
    // eslint-disable-next-line no-console
    console.log(inputValue);
  };

  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__left__section">
          <h1 className="hero__h1">
            在這屬於
            <span className="hero__h1--highlight">學生的社群中</span>
            <br />
            尋找屬於你的活動
          </h1>
        </div>
        <div className="hero__left__section">
          <SearchBar
            onSubmit={handleSubmit}
            placeholder="立即搜尋你的活動"
          />
        </div>
      </div>

    </div>
  );
}

export default Hero;
