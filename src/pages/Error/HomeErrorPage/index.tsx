import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function HomeErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="home__error-page">
      <h2>Oops!</h2>
      <p>載入首頁時似乎發生了一點錯誤</p>
      <Button
        text="按此重新載入頁面"
        variant={{ outline: true }}
        onClick={() => navigate(0)}
      />
    </div>
  );
}

export default HomeErrorPage;
