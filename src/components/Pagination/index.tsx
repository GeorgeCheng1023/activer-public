import React from 'react';
import Button from 'components/Button';
import useGetSearchParam from 'hooks/router/useGetSearchParam';
import useSetSearchParam from 'hooks/router/useSetSearchParam';
import useWindowWidth from 'hooks/window/useWindowWidth';
import './index.scss';

interface PaginationType {
  maxSegment: number;
}

function Pagination({ maxSegment } : PaginationType) {
  const setParam = useSetSearchParam();
  const page = useGetSearchParam('page', '1');
  const screenWidth = useWindowWidth();

  const handleSetParms = (pageNumber: number) => {
    setParam('page', pageNumber.toString());
  };

  if (maxSegment > 0) {
    return (
      <div className="search__pagination">

        <div
          className={`search__pagination__prev${Number(page) > 1 ? '--active' : ''} search__pagination__item`}
        >

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

        </div>
        <div className="search__pagination__main search__pagination__item">
          {
            Array.from({ length: maxSegment }, (_, index) => {
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

        <div className={`search__pagination__next${Number(page) < maxSegment ? '--active' : ''} search__pagination__item`}>

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
            onClick={() => handleSetParms(maxSegment)}
          />

        </div>

      </div>
    );
  }

  return null;
}

export default Pagination;
