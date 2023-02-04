import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectResults, expend } from 'store/searchPanel';

import './index.scss';
import { useLoaderData } from 'react-router-dom';
import { SearchLoaderType } from 'types/ActivityDataType';
import ResultItem from './ResultItem';

import SearchIndex from '../SearchIndex';

function Result() {
  const results = useAppSelector(selectResults);
  // loader in src\pages\Search
  const loaderData = useLoaderData() as SearchLoaderType;
  const dispatch = useAppDispatch();
  const searchResultData = {
    relative: results.filter((result) => result.weights > 1),
    other: results.filter((result) => result.weights === 1),
  };

  if (!loaderData.data) {
    dispatch(expend());
    return <SearchIndex />;
  }

  if (loaderData.data.searchResultData?.length > 0) {
    return (
      <div className="result">
        <h2>
          {searchResultData.relative.length}
          個最相關活動
        </h2>
        <div className="result__relative">
          {results && results
            .filter((result) => result.weights > 1)
            .map((result) => <ResultItem result={result} />)}
        </div>
        <h2>其他類似活動</h2>
        <div className="result__other">
          {results && results
            .filter((result) => result.weights === 1)
            .map((result) => <ResultItem result={result} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="result">
      <h2>很抱歉，找不到任何活動，請檢查是否有錯字，或更換關鍵字</h2>
    </div>
  );
}

export default Result;
