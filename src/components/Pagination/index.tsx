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

  if (maxSegment > 1) {
    return (
      <div className="pagination">

        <div
          className={`pagination__prev${Number(page) > 1 ? '--active' : ''} pagination__item`}
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
        <div className="pagination__main pagination__item">
          {
            Array.from({ length: maxSegment > 5 ? 5 : maxSegment }, (_, index) => {
              const pageNumber = (index + 1);
              return (
                <Button
                  text={pageNumber.toString()}
                  variant={{ outline: Number(page) === index + 1, square: true }}
                  key={`pagination-${index}`}
                  onClick={() => handleSetParms(pageNumber)}
                />
              );
            })
          }
          {
            maxSegment > 5
            && (
              <span>...</span>
            )
          }
        </div>

        <div className={`pagination__next${Number(page) < maxSegment ? '--active' : ''} pagination__item`}>

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
