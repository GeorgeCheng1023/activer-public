import Button from 'components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function SearchErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="search__error-page">
      <h2>Oops!</h2>
      <p>似乎發生了一點錯誤</p>
      <Button
        text="按此返回上一次搜尋紀錄"
        variant={{ outline: true }}
        onClick={() => navigate(-1)}
      />
    </div>
  );
}

export default SearchErrorPage;
