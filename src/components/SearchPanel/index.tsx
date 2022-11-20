// package
import React, { useEffect, useState } from 'react';
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
import Popup from 'components/SearchPanel/components/Popup';

// data
import { setSortTag } from 'store/searchPanel';
import dummyAllTags from './dummyAllTagText.json';
import dummyAllActivity from './dummyAllActivityTitle.json';

type Props = {
  recommendTags: TagType[],
  defaultTags: TagType[]
};

// main function
function Search({ recommendTags, defaultTags }: Props) {
  const dispatch = useAppDispatch();
  const [tagsRecommend, setTagsRecommend] = useState<TagType[]>(recommendTags);
  const [tagsStorage, setTagsStorage] = useState<TagType[]>(defaultTags);

  // init search value
  const [searchValue, setSearchValue] = useState({
    keyword: '',
    tags: defaultTags,
  });

  useEffect(() => {
    setTagsStorage(tagsStorage);
  }, [tagsStorage]);

  // to remove recommend tag from storage
  const handleRemoveTag = (clickedTag: TagType) => {
    // remove from storage
    const newTagsStorage = tagsStorage.filter((tag) => tag.id !== clickedTag.id);
    // check if exist in recommend
    if (!(tagsRecommend.map((tag) => tag.id).includes(clickedTag.id))) {
      // add to recommend
      setTagsRecommend([...tagsRecommend, clickedTag]);
    }
    // update
    setTagsStorage(newTagsStorage);
  };

  // to add recommend tag to storage
  const handleAddTag = (clickedTag: TagType) => {
    const newsTagsRecommend = tagsRecommend.filter((tag) => tag.id !== clickedTag.id);
    setTagsRecommend(newsTagsRecommend);
    // check if already exists in tagStorage
    if (tagsStorage.map((tag) => tag.id).includes(clickedTag.id)) {
      return;
    }
    // add in storage
    setTagsStorage([...tagsStorage, clickedTag]);
    // add in sort
    setSearchValue({
      ...searchValue,
      tags: [...tagsStorage, clickedTag],
    });
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
  const handleSearchSubmit = (inputValue: string) => {
    setSearchValue({
      ...searchValue,
      keyword: inputValue,
    });
  };

  const handleTagSubmit = (inputValue: string) => {
    // do something
    console.log(inputValue);
  };

  // handle sort change and update tag sorting in searchValue
  const handleSortChange = (newTags : Array<TagType>) => {
    // console.log(newTags);
    dispatch(setSortTag(newTags));
  };

  // redux
  const display = useAppSelector((state) => state.searchPanel.display);
  const sortTags = useAppSelector((state) => state.searchPanel.sortTags);
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
              <SearchBar
                onSubmit={handleTagSubmit}
                placeHolder="搜尋活動標籤"
                suggestion={
                  dummyAllTags.map((tag) => tag)
                }
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
