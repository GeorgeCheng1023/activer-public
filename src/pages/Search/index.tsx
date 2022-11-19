import React, { useState } from 'react';
import { TagType } from 'components/Tag';
import SearchPanel from 'components/SearchPanel';
import ResultBanner from './components/ResultBanner';
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
  // eslint-disable-next-line
  const [displaySearchPanel, setDisplaySearchPanel] = useState(false);

  return (
    <ResultBanner setTrigger={setDisplaySearchPanel} />

  );
}

export default Search;
