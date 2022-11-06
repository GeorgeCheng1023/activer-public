import React from 'react';
import TagSort from 'components/TagSort';
// import FormSearchBar from 'components/Form/FormSearchBar';
import dummySearchHistory from './dummySearchHistory.json';

function Preferences() {
  return (
    <>
      <h2>您的預設標籤庫</h2>
      <h2>搜尋紀錄</h2>
      {
        dummySearchHistory.map((history: any) => (
          <TagSort defaultTags={history.HistoryTags} />
        ))
      }
    </>
  );
}

export default Preferences;
