import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import React, { useState } from 'react';
import './index.scss';
import { apiUserResetPwd } from 'api/user';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Fade } from '@mui/material';
import Model from '../Login/components/modal';

// regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}';

function ForgetPwd() {
  const [newPassword, setNewPasswords] = useState<string>('');
  const [confirmNewPassword, setconfirmNewPassword] = useState<string>('');
  const [errMsg, setErrmsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const verifycode = searchParams.get('verifycode');
  const email = searchParams.get('email');

  const handleNewPasswordChange = (key: any, value: any) => {
    setNewPasswords(value);
  };

  const handleConfirmNewPasswordChange = (key: any, value: any) => {
    setconfirmNewPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifycode === null || email === null) {
      setErrmsg('驗證碼不正確或已過期');
      return;
    }
    if (newPassword === confirmNewPassword) {
      setLoading(true);
      let response;
      try {
        response = await apiUserResetPwd(newPassword, verifycode, email);
        setSuccess(true);
        console.log(response);
      } catch (err: any) {
        if (!err.response) {
          setErrmsg('伺服器無回應');
        } else if (err.response.status === 401) {
          setErrmsg('驗證碼不正確或已過期');
        } else if (err.response.status === 404) {
          setErrmsg('電子郵件未註冊');
        } else {
          setErrmsg('伺服器懶蛋');
        }
      }
      setLoading(false);
    }
  };

  function submitGate() {
    if ((newPassword === confirmNewPassword)
      && PWD_REGEX.test(newPassword)) {
      return true;
    }
    return false;
  }

  return (
    <div className="new-pwd__container">
      <Model open={success} onClose={() => setSuccess(false)}>
        <div className="new-pwd__model">
          <figure className="new-pwd__model-figure">
            <img className="new-pwd__model-icon" src="ok.png" alt="ok" />
            <h1>密碼更改成功</h1>
          </figure>
          <Link to="/">
            <Button text="回到首頁" />
          </Link>
        </div>
      </Model>

      <div className="new-pwd__err-msg-section">
        <Fade in={errMsg !== ''}>
          <Alert severity="error">
            <div className="new-pwd__err-msg">{errMsg}</div>
          </Alert>
        </Fade>
      </div>

      <main className="new-pwd">
        <form className="new-pwd__form" onSubmit={handleSubmit}>
          <h1 className="new-pwd__title">建立新密碼</h1>

          <h3 className="new-pwd__subtitle">輸入您的密碼</h3>

          <div className="new-pwd__text-field">
            <FormInput
              id="password"
              name="password"
              type="password"
              placeholder="密碼"
              pattern={PWD_REGEX_PATTERN}
              errorMessage="密碼格式錯誤"
              onChange={handleNewPasswordChange}
              formValue={newPassword}
            />
          </div>

          <h3 className="new-pwd__subtitle">確認密碼</h3>

          <div className="new-pwd__text-field">
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="確認密碼"
              pattern={newPassword}
              errorMessage="密碼錯誤"
              onChange={handleConfirmNewPasswordChange}
              formValue={confirmNewPassword}
            />
          </div>

          {loading
            ? <div className="new-pwd__button-load-animation" />
            : (
              <div className="new-pwd__submit-btn">
                <Button type="submit" color="secondary" text="修改" disabled={!submitGate()} />
              </div>
            )}
        </form>
      </main>
    </div>
  );
}

export default ForgetPwd;
