import React, { useState, useEffect } from 'react';
import './index.scss';
import SearchBar from '../../Form/FormSearchBar';
import Tag from '../../Tag';

type Props = {
  defaultTagsRecommend: Array<TagType>,
  defaultTagsStorage?: Array<TagType>,
};

const defaultProps = { defaultTagsStorage: [] };

function createTag(tag: TagType) {
  return <Tag color={tag.color} icon={tag.icon} text={tag.text} />;
}
function createListTag(tag: TagType) {
  return <li className="search__tag-li"><Tag color={tag.color} icon={tag.icon} text={tag.text} /></li>;
}

function Search({ defaultTagsRecommend, defaultTagsStorage = [] }: Props) {
  const [keywordInput, setKeywordInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const [tagsRecommend, setTagsRecommend] = useState<TagType[]>(defaultTagsRecommend);
  const [tagsStorage, setTagsStorage] = useState<TagType[]>(defaultTagsStorage);
  const [tagsSort, setTagsSort] = useState<TagType[]>(defaultTagsStorage);

  useEffect(() => {
    setTagsRecommend([{
      color: 'primary',
      icon: 'plus',
      text: 'recommend',
    }, {
      color: 'primary',
      icon: 'plus',
      text: 'recommend',
    }, {
      color: 'primary',
      icon: 'plus',
      text: 'recommend',
    }, {
      color: 'primary',
      icon: 'plus',
      text: 'red',
    }, {
      color: 'primary',
      icon: 'plus',
      text: 'recommend',
    }]);
    setTagsStorage([{
      color: 'primary',
      icon: 'plus',
      text: 'storage',
    }]);
    setTagsSort([{
      color: 'primary',
      icon: 'move',
      text: 'sort',
    }]);
  }, []);

  return (
    <div className="search">
      <div className="search__keyword">
        <div className="search__keyword-bar">
          <SearchBar inputValue={keywordInput} setInputValue={setKeywordInput} placeHolder="搜尋活動關鍵字" />
        </div>
      </div>
      <div className="search__tag">

        <div className="search__tag-search">
          <div className="search__tag-search-bar">
            <SearchBar inputValue={tagInput} setInputValue={setTagInput} placeHolder="搜尋活動標籤" />
          </div>

          <div className="search__tag-recommend">
            <h2>推薦標籤</h2>
            <div className="search__tag-class">
              {tagsRecommend.map(createTag)}
            </div>
          </div>
          <div className="search__tag-stortage">
            <h2>你的標籤庫</h2>
            <div className="search__tag-class">
              {tagsStorage.map(createTag)}
            </div>
          </div>
        </div>

        <div className="search__tag-sort">
          <h2>標籤排序</h2>
          <ol className="search__tag-sort-ol search__tag-class">
            {tagsSort.map(createListTag)}
          </ol>
        </div>
      </div>
    </div>
  );
}

Search.defaultProps = defaultProps;

export default Search;
