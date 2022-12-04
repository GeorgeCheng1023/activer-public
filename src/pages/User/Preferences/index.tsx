import React, { useState } from 'react';

// components
import TagSort from 'components/TagSort';
import SearchBar from 'components/Form/FormSearchBar';
import Button from 'components/Button';
import { BiSend } from 'react-icons/bi';
import Tag, { TagType } from 'components/Tag';
// redux
import { addHistoryTags, setKeyword } from 'store/searchPanel';
import { useAppDispatch } from 'hooks/redux';
// data
import dummyUserDefaultTags from './dummyUserDefaultTags.json';
import dummySearchHistory from './dummySearchHistory.json';

// style
import './index.scss';

// redux

// parseData
const parseDummySearchHistory = dummySearchHistory.map((history) => ({
  ...history,
  HistoryTags: history.HistoryTags.map((tag) => (
    {
      id: tag.Id,
      text: tag.Text,
      variant: tag.Type,
    }
  )),
}));

const parseDefaultTags = dummyUserDefaultTags.DefaultTags.map((tag: any) => ({
  id: tag.TagId,
  text: tag.Text,
  variant: tag.Type,
}));

const handleSubmit = (input: string) => {
  console.log(input);
};

function Preferences() {
  // eslint-disable-next-line
  const [defaultTags, setDefaultTags] = useState(parseDefaultTags);

  const handleSearchTagSubmit = (inputValue : string) => {
    // eslint-disable-next-line
    console.log(inputValue)
  };

  const handleSaveSubmit:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log(defaultTags);
  };

  const dispatch = useAppDispatch();
  const handleSearchHistory = (tags: TagType[], keyword: string) => {
    dispatch(addHistoryTags(tags));
    dispatch(setKeyword(keyword));
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
              <Button buttonType="submit" onClick={handleSaveSubmit} text="儲存" />
              <Button buttonType="submit" onClick={handleSaveSubmit} text="取消" variant="outline" />
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
      <div className="preferences__history">
        {
          parseDummySearchHistory.map((history: any, index) => (
            // eslint-disable-next-line
            <div className="history__container" key={`history-${index}`}>
              <div className="history__keyword">
                <SearchBar onSubmit={handleSubmit} placeHolder={history.Keyword} disabled />
              </div>
              <div className=" history__tag-sort">
                <TagSort tags={history.HistoryTags} disabled />
              </div>
              <div className=" history__button">
                <Button
                  variant="outline"
                  text="前往搜尋"
                  iconAfter={<BiSend />}
                  color="success"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearchHistory(history.HistoryTags, history.Keyword);
                  }}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Preferences;
