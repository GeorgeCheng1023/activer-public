import React, { useState } from 'react';
import './index.scss';
import Button from 'components/Button';
import { useAppSelector } from 'hooks/redux';
import { getUserIsLoggedIn } from 'store/auth';
import { getUserData } from 'store/user';
import { useCookies } from 'react-cookie';
import { apiUserVerifyAndChangePwd, apiUserVerifyAndResetPwd } from 'api/user';

function EmailLoading() {
  const userData = useAppSelector(getUserData);
  const isLoggedIn = useAppSelector(getUserIsLoggedIn);
  const [cookies] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResent = async () => {
    setLoading(true);
    if (isLoggedIn) {
      await apiUserVerifyAndChangePwd(cookies.sessionToken);
    } else {
      await apiUserVerifyAndResetPwd(userData.email);
    }
    setLoading(false);
  };

  const hideEmail = (email: string) => email.replace(email.slice(1, 4), '****');

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
          <strong className="email-verify__email">
            {hideEmail(userData.email) || '******@gamil.com'}
          </strong>
          <br />
          您需要驗證您的電子郵件地址才能登錄
        </h4>
        {loading
          ? <div className="email-verify__button-load-animation" />
          : (
            <div className="email-verify__resent-btn">
              <Button onClick={handleResent} color="secondary" text="重新發送" />
            </div>
          )}
      </main>
    </div>
  );
}

export default EmailLoading;
