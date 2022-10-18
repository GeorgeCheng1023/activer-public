import React from 'react';
// import SearchPopUp from './components/SearchPopUp';
import { CardColumn } from '../../components/Card';
import ResultBanner from './components/ResultBanner';

function Search() {
  return (
    <>
      <ResultBanner />
      <CardColumn
        imgUrl="https://plus.unsplash.com/premium_photo-1661329835271-c130b1ea3f28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60
      "
        title="img"
        altText="img"
        tags={[{ color: 'primary', text: 'tag' }]}
        animation=""
        detail="Date: 2022/10/2 ~ 2022/10/3"
      />
    </>
  );
}

export default Search;
