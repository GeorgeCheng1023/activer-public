import React, { useState, useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import './index.scss';

function generateErrorMessage(errorCode: number | undefined): string {
  if (errorCode === 404) {
    return '此頁面不存在';
  }

  if (errorCode === 401) {
    return '你沒有權限閱讀此頁';
  }
  if (errorCode === 400) {
    return '錯誤請求';
  }

  if (errorCode === 503 || errorCode === 500) {
    return '伺服器錯誤';
  }

  if (errorCode === 418) {
    return '🫖';
  }
  return '似乎發生一些未預期的錯誤';
}

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export function throwError(message: string, status: number) {
  throw new CustomError(message, status);
}

function RootErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError() as any;
  const [errorTitle, setErrorTitle] = useState<string>('Oops!');
  const [errorMessage, setErrorMessage] = useState<string>('似乎發生一些未預期的錯誤');
  const [errorDetail, setErrorDetail] = useState<string>();
  const [errorCode, setErrorCode] = useState<number>();

  useEffect(() => {
    if (error instanceof CustomError) {
      /** Custom Error */
      setErrorTitle(error.message);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
    } else if (isRouteErrorResponse(error)) {
      /** react-router-dom: erro */
      setErrorTitle(error.statusText || error.data);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
      setErrorDetail('React router dom error');
    } else if (error.name === 'AxiosError') {
      setErrorTitle(error.response?.statusText);
      setErrorCode(error.response?.status);
      setErrorMessage(generateErrorMessage(error.response?.status));
      setErrorDetail('Axios Error');
    }

    // show in console
    console.error(error);
  }, []);

  return (
    <div className="error">
      <Header />
      <div className="error__main">

        <h1 className="error__title">
          {errorTitle}
        </h1>

        <div className="error__message">
          {errorCode}
          :
          {' '}
          {errorMessage}
        </div>
        {errorDetail
        && (
          <div className="error__detail">
            {errorDetail && errorDetail}
          </div>
        )}
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
