import React from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectResults } from 'store/searchPanel';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import './index.scss';
import { Link } from 'react-router-dom';

function Result() {
  const results = useAppSelector(selectResults);
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

export default Result;
