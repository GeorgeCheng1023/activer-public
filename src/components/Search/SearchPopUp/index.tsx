import React, { useState } from 'react';
import './index.scss';
import SearchBar from '../../Form/FormSearchBar';
import Tag, { allTagColor } from '../../Tag';

function Search() {
  const [keywordInput, setKeywordInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  return (
    <div className="search">
      <h1>搜尋活動關鍵字</h1>
      <SearchBar inputValue={keywordInput} setInputValue={setKeywordInput} />
      <div className="search__tag-search">
        <SearchBar inputValue={tagInput} setInputValue={setTagInput} />
        <div className="search__tag-recommend">
          <h2>推薦標籤</h2>
          <Tag tagText="台中" tagColor={allTagColor.success} tagIcon="plus" />
        </div>
        <div className="search__tag-stortage">
          <h2>你的標籤庫</h2>
          <Tag tagText="線上" tagColor={allTagColor.success} tagIcon="minus" />
        </div>
      </div>
      <div className="search__tag-sort">
        <h2>標籤排序</h2>
        <div>
          <Tag tagText="線上" tagColor={allTagColor.success} tagIcon="minus" />
        </div>
      </div>
    </div>
  );
}

export default Search;
