import React from 'react';
import './index.scss';
import Button from '../../../../components/Button';

function ResultBanner() {
  return (
    <div className="result__banner">
      <h1 className="result__banner__h1 ">搜尋結果</h1>
      <div className="result__banner__btn">
        <Button color="primary" decoration="outline" text="修改搜尋條件" />
      </div>
    </div>
  );
}

export default ResultBanner;
