import React from 'react';
import './index.scss';
import Button from 'components/Button';
import { useAppSelector } from 'hooks/redux';
import { getUserData } from 'store/userAuth';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  const userData = useAppSelector(getUserData);
  const nevigate = useNavigate();

  const handleResent = () => {
    console.log('resent');
  };

  setTimeout(() => {
    nevigate('/login', { replace: true });
  }, 1000);

  return (
    <div className="email-verify__container">
      <main className="email-verify">
        <figure className="email-verify__figure">
          <img className="email-verify__figure__img" src="/envelope.png" alt="Email" />
          <figcaption className="email-verify__figure__caption">確認您的電子信箱</figcaption>
        </figure>
        <h4 className="email-verify__text">
          <br />
          我們已經發送了一封驗證信到
          {userData.Email || '******@gamil.com'}
          <br />
          您需要驗證您的電子郵件地址才能登錄
        </h4>
        <div className="email-verify__resent-btn">
          <Button onClick={handleResent} color="secondary" text="重新發送" />
        </div>
      </main>
    </div>
  );
}

export default EmailVerify;
