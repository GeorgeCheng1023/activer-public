import React from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectResults } from 'store/searchPanel';
import Card from 'components/Card';
import { useParseArrayTagDataToTag } from 'hooks/tag';
import './index.scss';
import { Link, useLoaderData } from 'react-router-dom';
import { SearchLoaderType } from 'types/ActivityDataType';
import useConvertDate from 'hooks/date/useConvertDate';
import SearchIndex from '../SearchIndex';

function Result() {
  const results = useAppSelector(selectResults);
  // loader in src\pages\Search
  const loaderData = useLoaderData() as SearchLoaderType;

  if (!loaderData.data) {
    return <SearchIndex />;
  }

  if (loaderData.data.searchResultData?.length > 0) {
    return (
      <div className="result">
        {results && results.map((result) => {
          const {
            id, tags, title, images, branches,
          } = result;

          const firstDateStart = branches ? branches[0].dateStart : null;
          const firstDateEnd = branches
            ? branches[0].dateEnd
            : null;
          const cardDetail = firstDateEnd
          && firstDateStart
            ? `${useConvertDate(firstDateStart[Object.keys(firstDateStart)[0]])} ~ ${useConvertDate(firstDateEnd[0])}`
            : null;

          return (

            <Link
              to={`/detail/${id}`}
              key={`result-${id}`}
            >
              <Card
                id={id.toString()}
                tags={tags ? useParseArrayTagDataToTag(tags) : []}
                title={title}
                imgUrl={images ? images[0] : '/DefaultActivityPng.png'}
                altText={title}
                detail={cardDetail}
              />
            </Link>
          );
        })}
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
