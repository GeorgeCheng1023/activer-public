import React from 'react';
import TagSort from 'components/TagSort';
import SearchBar from 'components/Form/FormSearchBar';
import Button from 'components/Button';
import { BiSend } from 'react-icons/bi';
import dummySearchHistory from './dummySearchHistory.json';
import './index.scss';

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

const handleSubmit = (input: string) => {
  console.log(input);
};

function Preferences() {
  return (
    <div className="preferences">
      <h2 className="preferences__h2">您的預設標籤庫</h2>

      <h2 className="preferences__h2">搜尋紀錄</h2>
      <div className="preferences__history">
        {
          parseDummySearchHistory.map((history: any) => (
            <div className=" history__container">
              <div className="history__keyword">
                <SearchBar onSubmit={handleSubmit} placeHolder={history.Keyword} disabled />
              </div>
              <div className=" history__tag-sort">
                <TagSort tags={history.HistoryTags} disable />
              </div>
              <div className=" history__button">
                <Button
                  variant="outline"
                  text="前往搜尋"
                  iconAfter={<BiSend />}
                  color="success"
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
