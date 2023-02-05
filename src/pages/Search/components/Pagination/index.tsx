import Button from 'components/Button';
import useWindowWidth from 'hooks/window/useWindowWidth';
import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { SearchLoaderType } from 'types/ActivityDataType';
import './index.scss';

function Pagination() {
  const loaderData = useLoaderData() as SearchLoaderType;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const screenWidth = useWindowWidth();

  const handleSetParms = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(
      () => {
        searchParams.set('page', pageNumber.toString());
        return searchParams;
      },
    );
  };

  if (loaderData.data.searchResultData.length > 0) {
    return (
      <div className="search__pagination">

        <div className="search__pagination__prev">
          {page && Number(page) > 1
        && (
          <>
            <Button
              type="button"
              text={`<< ${screenWidth > 768 ? '第一頁' : ''}`}
              color="white"
              onClick={() => handleSetParms(1)}
            />
            <Button
              type="button"
              text={`< ${screenWidth > 768 ? '上一頁' : ''}`}
              color="white"
              onClick={() => handleSetParms(Number(page) - 1)}
            />
          </>
        )}
        </div>
        <div className="search__pagination__main">
          {
            Array.from({ length: loaderData.data.maxSegment }, (_, index) => {
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

        <div className="search__pagination__next">
          { (Number(page) < loaderData.data.maxSegment)
        && (
          <>
            <Button
              type="button"
              color="white"
              text={`${screenWidth > 768 ? '下一頁' : ''} >`}
              onClick={() => handleSetParms(Number(page) + 1)}
            />
            <Button
              type="button"
              color="white"
              text={`${screenWidth > 768 ? '最後一頁' : ''} >>`}
              onClick={() => handleSetParms(loaderData.data.maxSegment)}
            />
          </>
        )}
        </div>
      </div>
    );
  }

  return null;
}

export default Pagination;
