import { TagType } from 'components/Tag';
import React from 'react';
// import { CardColumn, CardType } from '../../components/Card';
import ResultBanner from './components/ResultBanner';
import SearchPopup from './components/SearchPopUp';
import dummySearchData from './dummySearchData.json';

//  parse data
const parseData = {
  defaultTags: dummySearchData.DefaultTags.map((tag) => (
    {
      id: tag.Id,
      text: tag.Text,
      variant: tag.Type,
    }
  )),
  recommendTags: dummySearchData.RecommendTags.map((tag) => (
    {
      id: tag.Id,
      text: tag.Text,
      variant: tag.Type,
    }
  )),
};

function Search() {
  return (
    <>
      <ResultBanner />
      <SearchPopup
        defaultTags={parseData.defaultTags as TagType[]}
        recommendTags={parseData.recommendTags as TagType[]}
      />

    </>

  );
}

export default Search;
