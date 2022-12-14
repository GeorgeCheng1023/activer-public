// eslint-disable

import React, { useState } from 'react';

// components
import SearchBar from 'components/Form/FormSearchBar';
import Button from 'components/Button';
import Tag, { TagType } from 'components/Tag';
import SearchHistory from './components/SearchHistory';

// data
import dummyUserDefaultTags from './dummyUserDefaultTags.json';
import dummyHistory from './dummyHistory.json';

// style
import './index.scss';

const parseDefaultTags = dummyUserDefaultTags.DefaultTags.map((tag: any) => ({
  id: tag.TagId,
  text: tag.Text,
  variant: tag.Type,
}));

function Preferences() {
  // eslint-disable-next-line
  const [defaultTags, setDefaultTags] = useState(parseDefaultTags);

  const handleSearchTagSubmit = (inputValue : string) => {
    console.log(inputValue);
  };

  const handleSaveSubmit:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    console.log(defaultTags);
  };

  return (
    <div className="preferences">
      <div className="preferences__default-tags">
        <div className="preferences__default-tags__control">
          <h2 className="preferences__h2">您的預設標籤庫</h2>
          <div className="preferences__default-tags__control__right">
            <div className="preferences__default-tags__control_right__search-bar">
              <SearchBar placeHolder="搜尋標籤" onSubmit={handleSearchTagSubmit} />
            </div>
            <div className="preferences__default-tags__control__right__buttons">
              <Button type="submit" onClick={handleSaveSubmit} text="儲存" />
              <Button type="submit" onClick={handleSaveSubmit} text="取消" variant={{ outline: true }} />
            </div>
          </div>
        </div>
        <div className="preferences__default-tags__container">
          {defaultTags.map((tag: TagType) => (
            <Tag
              key={tag.id}
              id={tag.id.toString()}
              variant={tag.variant}
              text={tag.text}
              icon="minus"
            />
          ))}

        </div>
      </div>
      <h2 className="preferences__h2">搜尋紀錄</h2>
      <SearchHistory histories={dummyHistory} />

    </div>
  );
}

export default Preferences;
