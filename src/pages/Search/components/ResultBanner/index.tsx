import React from 'react';
import Button from '../../../../components/Button';
import './index.scss';

type Props = {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

function ResultBanner({ setTrigger } : Props) {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  return (
    <div className="result__banner">
      <h1 className="result__banner__h1">搜尋結果</h1>
      <Button
        color="primary"
        variant="outline"
        text="修改搜尋條件"
        size="sm"
        onClick={handleClick}
      />
    </div>
  );
}

export default ResultBanner;
