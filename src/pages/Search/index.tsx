import React, { useState } from 'react';
import { TagType } from 'components/Tag';
import Popup from 'components/Popup';
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
  const [displaySearchPanel, setDisplaySearchPanel] = useState(false);

  return (
    <>
      <ResultBanner setTrigger={setDisplaySearchPanel} />
      <Popup
        trigger={displaySearchPanel}
        setTrigger={setDisplaySearchPanel}
      >
        <SearchPanel
          defaultTags={parseData.defaultTags as TagType[]}
          recommendTags={parseData.recommendTags as TagType[]}
        />
      </Popup>

    </>

  );
}

export default Search;
