import React from 'react';

// hooks
import { useAppSelector } from 'hooks/redux';

// style
import './index.scss';

import {

  selectDisplay,

  selectKeyword,
} from 'store/searchPanel';

import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import {
  Popup, RecommendTag, SortTag, StorageTag,
} from './components';

// store

// main function
function Search() {
  const display = useAppSelector(selectDisplay);

  const keyword = useAppSelector(selectKeyword);

  // handle search submit event and update keyword in searchValue
  // eslint-disable-next-line
  const handleSearchSubmit = (inputValue: string) => {
    console.log('submit');
  };

  // redux
  return (

    <Popup display={display}>
      <div className="search">

        {/* activity keyword search */}
        <div className="search__keyword">
          <div className="search__keyword-bar">
            <SearchBar
              onSubmit={handleSearchSubmit}
              placeHolder="搜尋活動關鍵字"
              defaultText={keyword}
            />
          </div>
        </div>

        {/* search tag box  */}
        <div className="search__tag">

          {/* tag manage: search, recommend, storage */}
          <div className="search__tag tag-manage">

            {/* tag searching */}
            <div className="search__tag tag-manage__search">
              <SearchTag
                placeHolder="搜尋活動標籤"
              />
            </div>

            {/* recommend tag */}
            <div className="search__tag tag-recommend">
              <RecommendTag />
            </div>

            {/* tag stortage */}
            <div className="search__tag tag-storage">
              <StorageTag />
            </div>
          </div>

          {/* tag sorting */}
          <div className="search__tag tag-sorting">
            <SortTag />
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default Search;
