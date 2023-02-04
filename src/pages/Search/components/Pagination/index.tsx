import Button from 'components/Button';
import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { SearchLoaderType } from 'types/ActivityDataType';
import './index.scss';

function Pagination() {
  const loaderData = useLoaderData() as SearchLoaderType;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data } = loaderData;

  const handleSetParms = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(
      () => {
        searchParams.set('page', pageNumber.toString());
        return searchParams;
      },
    );
  };

  if (data) {
    return (
      <div className="search__pagination">
        {page && Number(page) > 1
        && (
          <div className="search__pagination__prev">
            <Button
              type="button"
              text="<< 第一頁"
              color="white"
              onClick={() => handleSetParms(1)}
            />
            <Button
              type="button"
              text="< 上一頁"
              color="white"
              onClick={() => handleSetParms(Number(page) - 1)}
            />
          </div>
        )}
        <div className="search__pagination__main">
          {
            Array.from({ length: data.maxSegment }, (_, index) => {
              const pageNumber = (index + 1);
              return (
                <Button
                  text={pageNumber.toString()}
                  variant={{ outline: Number(page) === index + 1, square: true }}
                  key={`search__pagination-${index}`}
                  onClick={() => handleSetParms(pageNumber)}
                />
              );
            })
          }
        </div>
        { (Number(page) < loaderData.data.maxSegment)
        && (
          <div className="search__pagination__next">
            <Button
              type="button"
              color="white"
              text="下一頁 >"
              onClick={() => handleSetParms(Number(page) + 1)}
            />
            <Button
              type="button"
              color="white"
              text="最後一頁 >>"
              onClick={() => handleSetParms(loaderData.data.maxSegment)}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default Pagination;
