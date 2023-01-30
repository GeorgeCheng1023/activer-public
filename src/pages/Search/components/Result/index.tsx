import React from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectResults } from 'store/searchPanel';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import './index.scss';
import { Link, useLoaderData } from 'react-router-dom';

import { SearchLoaderDataType } from 'types/ActivityDataType';

function Result() {
  const results = useAppSelector(selectResults);
  const loaderData = useLoaderData() as SearchLoaderDataType;

  if (loaderData.data.length > 0) {
    return (
      <div className="result">
        {results && results.map((result) => (
          <Link to={`/detail/${result.id}`}>
            <Card
              id={result.id.toString()}
              tags={result.tags ? useParseArrayTagDataToTag(result.tags) : []}
              title={result.title}
              imgUrl={result.images ? result.images[0] : '/DefaultActivityPng.png'}
              altText={result.title}
            />
          </Link>
        ))}
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
