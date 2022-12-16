import React from 'react';
// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';
// style
import './index.scss';
// store
import {
  selectDisplay,
  selectKeyword,
  addStorage,
  hide,
} from 'store/searchPanel';
// component
import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import Popup from 'components/Popup';
import { TagType } from 'components/Tag';
import {
  RecommendTag, SortTag, StorageTag,
} from './components';
// main function
function Search() {
  // setting redux hooks
  const display = useAppSelector(selectDisplay);
  const keyword = useAppSelector(selectKeyword);
  const dispatch = useAppDispatch();

  const handleSuggestionClick = (clickedSuggestion: TagType) => {
    dispatch(addStorage(clickedSuggestion));
  };

  // handle search submit event and update keyword in searchValue
  const handleSearchSubmit = (inputValue: string) => {
    // TODO: fetch activity data by inputValue
    console.log(inputValue);
  };

  // redux
  return (

    <Popup
      display={display}
      onClose={() => dispatch(hide())}
    >
      <div className="search">

        {/* activity keyword search */}
        <div className="search__keyword">
          <div className="search__keyword-bar">
            <SearchBar
              onSubmit={handleSearchSubmit}
              placeholder="搜尋活動關鍵字"
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
                placeholder="搜尋活動標籤"
                onSuggestionClick={handleSuggestionClick}
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
