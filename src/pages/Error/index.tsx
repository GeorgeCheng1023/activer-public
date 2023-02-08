import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import './index.scss';

function ErrorMessage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <h1 className="error__message">此頁面不存在</h1>;
    }

    if (error.status === 401) {
      return <h1 className="error__message">你沒有權限閱讀此頁</h1>;
    }

    if (error.status === 503) {
      return <h1 className="error__message">伺服器錯誤</h1>;
    }

    if (error.status === 418) {
      return <h1 className="error__message">🫖</h1>;
    }
  }

  return <h1 className="error__message">似乎發生了錯誤</h1>;
}

function RootErrorBoundary() {
  const navigate = useNavigate();
  return (
    <div className="error">
      <Header />
      <div className="error__main">
        <ErrorMessage />
        <Button text="問題回報" />
        <Button
          text="按此返回上一頁"
          variant={{ outline: true }}
          onClick={() => navigate(-1)}
        />
      </div>
      <Footer />
    </div>
  );
}

export default RootErrorBoundary;
