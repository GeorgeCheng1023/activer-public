import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// hooks
import { useAppSelector, useAppDispatch } from 'hooks/redux';

// style
import './index.scss';
// components
import TagSort from 'components/TagSort';
import { TagNoLink as Tag, TagType } from 'components/Tag';
import SearchBar from 'components/Form/FormSearchBar';
import SearchTag from 'components/Form/FormSearchTag';
import Popup from 'components/SearchPanel/components/Popup';

// store
import {
  setSortTag,
  addStorage,
  removeStorage,
  selectRecommendTags,
  selectStorageTags,
  selectDisplay,
  selectSortTags,
} from 'store/searchPanel';

// hooks
import dummyAllActivity from './dummyAllActivityTitle.json';

// main function
function Search() {
  const dispatch = useAppDispatch();
  const tagsStorage = useAppSelector(selectStorageTags);
  const tagsRecommend = useAppSelector(selectRecommendTags);
  const display = useAppSelector(selectDisplay);
  const sortTags = useAppSelector(selectSortTags);

  // to remove recommend tag from storage
  const handleRemoveTag = (clickedTag: TagType) => {
    dispatch(removeStorage(clickedTag));
  };

  // to add recommend tag to storage
  const handleAddTag = (clickedTag: TagType) => {
    dispatch(addStorage(clickedTag));
  };

  //  to render the storage tag
  function renderStorageTag(tag: TagType) {
    return (
      <Tag
        key={tag.id}
        variant={tag.variant}
        icon="minus"
        text={tag.text}
        id={tag.id}
        onClick={handleRemoveTag}
      />

    );
  }

  //  to render the Recommend tag
  function renderRecommendTag(tag: TagType) {
    return (
      <Tag
        key={tag.id}
        variant={tag.variant}
        icon="plus"
        text={tag.text}
        id={tag.id}
        onClick={handleAddTag}
      />
    );
  }

  // handle search submit event and update keyword in searchValue
  // eslint-disable-next-line
  const handleSearchSubmit = (inputValue: string) => {
    console.log('submit');
  };

  // handle sort change and update tag sorting in searchValue
  const handleSortChange = (newTags : Array<TagType>) => {
    dispatch(setSortTag(newTags));
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
              suggestion={
                dummyAllActivity.map((activity) => activity.title)
              }
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
              <h2 className="search__h2">推薦標籤</h2>
              <div className="search--flex">
                {tagsRecommend.map(renderRecommendTag)}
              </div>
            </div>

            {/* tag stortage */}
            <div className="search__tag tag-storage">
              <h2 className="search__h2">你的標籤庫</h2>
              <div className="search--flex">
                {tagsStorage.map(renderStorageTag)}
              </div>
            </div>
          </div>

          {/* tag sorting */}
          <div className="search__tag tag-sorting">
            <h2 className="search__h2">標籤排序</h2>
            <DndProvider backend={HTML5Backend}>
              <TagSort
                tags={sortTags}
                onChange={handleSortChange}
              />
            </DndProvider>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default Search;
