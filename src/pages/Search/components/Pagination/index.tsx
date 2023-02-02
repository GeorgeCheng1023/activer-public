import Button from 'components/Button';
import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { SearchLoaderType } from 'types/ActivityDataType';
import './index.scss';

function Pagination() {
  const loaderData = useLoaderData() as SearchLoaderType;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const { data } = loaderData;
  if (data) {
    return (
      <div className="search__pagination">
        {
          Array.from({ length: data.maxSegment }, (_, index) => (
            <Button
              text={index.toString()}
              variant={{ colorReverse: Number(page) === index }}
              key={`search__pagination-${index}`}
            />
          ))
        }
      </div>
    );
  }

  return null;
}

export default Pagination;
