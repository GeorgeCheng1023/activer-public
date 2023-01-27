import React from 'react';
// components
import { useAppSelector } from 'hooks/redux';
import { selectResults } from 'store/searchPanel';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import SearchPanel from './components/SearchPanel';

function Search() {
  const results = useAppSelector(selectResults);

  return (
    <>
      <SearchPanel />
      <div className="result">
        {results && results.map((result) => (
          <Card
            id={result.id.toString()}
            tags={result.tags ? useParseArrayTagDataToTag(result.tags) : []}
            title={result.title}
            imgUrl={result.images ? result.images[0] : '/public/DefaultActivityPng.png'}
            altText={result.title}
          />
        ))}
      </div>
    </>
  );
}
export default Search;
