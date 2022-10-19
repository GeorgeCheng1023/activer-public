import React from 'react';
import Button from '../../../../components/Button';
import './index.scss';

function ResultBanner() {
  return (
    <div className="result__banner">
      <h1 className="result__banner__h1">搜尋結果</h1>
      <Button color="primary" variant="outline" text="修改搜尋條件" size="sm" />
    </div>
  );
}

export default ResultBanner;
