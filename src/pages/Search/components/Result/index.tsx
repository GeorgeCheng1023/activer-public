import React, { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectResults } from 'store/searchPanel';
import './index.scss';
import { useLoaderData } from 'react-router-dom';
import { SearchLoaderType } from 'types/Loader';
import MainCard from 'components/Card/MainCard';
import Pagination from 'components/Pagination';

function Result() {
  const results = useAppSelector(selectResults);
  // loader in src\pages\Search
  const loaderData = useLoaderData() as SearchLoaderType;
  const classfiedSearchResultData = useMemo(() => ({
    relative: results.filter((result) => result.weights > 1),
    other: results.filter((result) => result.weights === 1),
  }), [results]);

  if (!loaderData.data) {
    return <div>歡迎使用搜尋功能，你可以設定你想要參與活動的關鍵字，也可以透過標籤搜尋。</div>;
  }

  if (loaderData.data.searchResultData?.length > 0) {
    return (
      <>
        <div className="result">
          {classfiedSearchResultData.relative.length > 0 && (
            <>
              <h2>
                {classfiedSearchResultData.relative.length}
                個最相關活動
              </h2>
              <div className="result__relative">
                {classfiedSearchResultData.relative.map(
                  (result) => (
                    <MainCard
                      activity={result.activity}
                      key={`result-item-${result.activity.id}`}
                    />
                  ),
                )}
              </div>
            </>
          )}
          <h2>其他類似活動</h2>
          {classfiedSearchResultData.other.length > 0 && (
            <div className="result__other">
              {
                classfiedSearchResultData.other.map(
                  (result) => (
                    <MainCard
                      activity={result.activity}
                      key={`result-item-${result.activity.id}`}
                    />
                  ),
                )
              }
            </div>
          )}
        </div>
        <Pagination maxSegment={loaderData.data.maxSegment} />
      </>
    );
  }

  return (
    <div className="result">
      <h2>很抱歉，找不到任何活動，請檢查是否有錯字，或更換關鍵字</h2>
    </div>
  );
}

export default Result;
