import React, { useState } from 'react';
import './index.scss';
import TagSort from 'components/TagSort';
import { TagNoLink as Tag, TagType } from 'components/Tag';
import SearchBar from '../../../../components/Form/FormSearchBar';

type Props = {
  defaultTagsRecommend: Array<TagType>,
  defaultTagsStorage: Array<TagType>,
  defaultKeyword: string
};

// main function
function Search({ defaultTagsRecommend, defaultTagsStorage, defaultKeyword }: Props) {
  const [tagsRecommend, setTagsRecommend] = useState<TagType[]>(defaultTagsRecommend);
  const [tagsStorage, setTagsStorage] = useState<TagType[]>(defaultTagsStorage);
  const [searchValue, setSearchValue] = useState({
    keyword: '',
    tags: defaultTagsStorage,
  });

  // to remove recommend tag from storage
  const handleRemoveTag = (clickTag: TagType) => {
    const newTagsStorage = tagsStorage.splice(tagsStorage.indexOf(clickTag), 1);
    setTagsStorage(newTagsStorage);
  };

  // to add recommend tag to storage
  const handleAddTag = (tag: TagType) => {
    setTagsStorage([...tagsStorage, tag]);
  };

  //  to render the storage tag
  function renderStorageTag(tag: TagType) {
    return (
      <Tag
        color={tag.color}
        icon={tag.icon}
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
        color={tag.color}
        icon={tag.icon}
        text={tag.text}
        id={tag.id}
        onClick={handleAddTag}
      />
    );
  }

  // handle full search submit event amd update keyword in searchValue
  const handleSearchSubmit:
  React.FormEventHandler<HTMLButtonElement | HTMLInputElement> = (e) => {
    // update keyword in searchValue
    setSearchValue({
      ...searchValue,
      keyword: (e.target as HTMLButtonElement | HTMLInputElement).value,
    });

    // post
    // eslint-disable-next-line no-console
    console.log(searchValue);
  };

  // handle sort change and update searchValue
  const handleSortChange = (newTags : Array<TagType>) => {
    setSearchValue({ ...searchValue, tags: newTags });
  };

  return (
    <div className="search">
      <div className="search__keyword">
        <div className="search__keyword-bar">
          <SearchBar onSubmit={handleSearchSubmit} placeHolder="搜尋活動關鍵字" />
        </div>
      </div>
      <div className="search__tag">

        <div className="search__tag-search">
          {/* <div className="search__tag-search-bar">
            <SearchBar onSubmit={handleTagSubmit} placeHolder="搜尋活動標籤" />
          </div> */}

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
          <TagSort
            defaultTags={defaultTagsStorage}
            onChange={handleSortChange}
            canDrag
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
