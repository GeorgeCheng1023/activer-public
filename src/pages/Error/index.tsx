import React, { useState, useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import './index.scss';

function generateErrorMessage(errorCode: number): string {
  if (errorCode === 404) {
    return '此頁面不存在';
  }

  if (errorCode === 401) {
    return '你沒有權限閱讀此頁';
  }

  if (errorCode === 503 || errorCode === 500) {
    return '伺服器錯誤';
  }

  if (errorCode === 418) {
    return '🫖';
  }
  return '似乎發生一些未預期的錯誤';
}

function RootErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError() as any;
  const [errorMessage, setErrorMessage] = useState<string | null>('似乎發生一些未預期的錯誤');

  /** react-router-dom */
  if (isRouteErrorResponse(error)) {
    setErrorMessage(generateErrorMessage(error.status));
  }

  /** Axios */
  if (error.response) {
    setErrorMessage(error.response.status);
  }
  useEffect(() => {
    console.error(error);
  }, []);

  return (
    <div className="error">
      <Header />
      <div className="error__main">
        <div className="error__message">
          {errorMessage}
        </div>
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
