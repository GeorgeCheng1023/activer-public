import React from 'react';

import SearchHistoryItem, { HistoryDataType } from '../SearchHistoryItem';
import './index.scss';

interface Props {
  histories: HistoryDataType[]
}

function SearchHistory({ histories } : Props) {
  return (
    <div className="preferences__history">
      {histories.map((history) => <SearchHistoryItem data={history} />)}
    </div>
  );
}

export default SearchHistory;
