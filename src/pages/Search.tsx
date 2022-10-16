import React from 'react';
import SearchPopUp from '../components/Search/SearchPopUp';

function Search() {
  return (
    <>
      <h1>SearchPopup</h1>
      <p> This is Search Popup </p>
      <SearchPopUp defaultTagsRecommend={[{ color: 'success', icon: 'move', text: 'blablabla' }]} />
    </>
  );
}

export default Search;
