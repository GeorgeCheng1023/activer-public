import React, { useState } from 'react';
import './index.scss';

// component
// import Card from '../Card';
import SearchBar from '../Form/FormSearchBar';
<<<<<<< HEAD
import Card from '../Card';
=======
>>>>>>> 83ed5456d1cdf44468f2bf7f3e0195327aae0e96
// import CardRoll from './components/CardRoll';

function Hero() {
  const [searchInputValue, setSearchInputValue] = useState('');
  // TEMP
  // const cardList = [
  //   <Card
  //     imgUrl="https://attach.setn.com/newsimages/2018/10/23/1604390-XXL.jpg"
  //     title="鼻地大師 國動"
  //     tags={[]}
  //   />,
  //   <Card
  //     imgUrl="https://attach.setn.com/newsimages/2018/10/23/1604390-XXL.jpg"
  //     title="鼻地大師 國動"
  //     tags={[]}
  //   />,
  //   <Card
  //     imgUrl="https://attach.setn.com/newsimages/2018/10/23/1604390-XXL.jpg"
  //     title="鼻地大師 國動"
  //     tags={[]}
  //   />,
  // ];

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
        <Card
          imgUrl="https://attach.setn.com/newsimages/2018/10/23/1604390-XXL.jpg"
          title="鼻地大師 國動"
          altText="巨槌瑞斯 開剁"
          animation=""
          tags={[]}
        />
      </div>
    </div>
  );
}

export default Hero;
