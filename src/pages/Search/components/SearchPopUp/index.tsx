import React, { useEffect, useState } from 'react';
import './index.scss';
import TagSort from 'components/TagSort';
import { TagNoLink as Tag, TagType } from 'components/Tag';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchBar from 'components/Form/FormSearchBar';
import dummyAllTags from './dummyAllTagText.json';
import dummyAllActivity from './dummyAllActivityTitle.json';

type Props = {
  recommendTags: TagType[],
  defaultTags: TagType[]
};

// main function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Search({ recommendTags, defaultTags }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tagsRecommend, setTagsRecommend] = useState<TagType[]>(recommendTags);
  const [tagsStorage, setTagsStorage] = useState<TagType[]>(defaultTags);

  // init search value
  const [searchValue, setSearchValue] = useState({
    keyword: '',
    tags: defaultTags,
  });

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

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
    setTagsStorage([...tagsStorage, clickedTag]);
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

  // handle sort change and update searchValue
  const handleSortChange = (newTags : Array<TagType>) => {
    setSearchValue({ ...searchValue, tags: newTags });
  };

  return (
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

      <div className="search__tag">

        <div className="search__tag-search">
          <div className="search__tag-search-bar">
            <SearchBar
              onSubmit={handleTagSubmit}
              placeHolder="搜尋活動標籤"
              suggestion={
                dummyAllTags.map((tag) => tag)
              }
            />
          </div>

          <div className="search__tag-recommend">
            <h2>推薦標籤</h2>
            <div className="search__tag-class">
              {tagsRecommend.map(renderRecommendTag)}
            </div>
          </div>
          <div className="search__tag-stortage">
            <h2>你的標籤庫</h2>
            <div className="search__tag-class">
              {tagsStorage.map(renderStorageTag)}
            </div>
          </div>
        </div>

        <div className="search__tag-sort">
          <h2>標籤排序</h2>
          <DndProvider backend={HTML5Backend}>
            <TagSort
              defaultTags={tagsStorage}
              onChange={handleSortChange}
              canDrag
            />
          </DndProvider>
        </div>
      </div>
    </div>
  );
}

export default Search;
