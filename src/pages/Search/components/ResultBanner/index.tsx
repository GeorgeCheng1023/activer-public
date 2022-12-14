import React from 'react';
import Button from 'components/Button';
import './index.scss';
import { show } from 'store/searchPanel';
import { useAppDispatch } from 'hooks/redux';

function ResultBanner() {
  const dispatch = useAppDispatch();

  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(show());
  };

  return (
    <div className="result__banner">
      <h1 className="result__banner__h1">搜尋結果</h1>
      <Button
        color="primary"
        variant={{ outline: true }}
        text="修改搜尋條件"
        size="sm"
        onClick={handleClick}
      />
    </div>
  );
}

export default ResultBanner;
