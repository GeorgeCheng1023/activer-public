import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import React, { useState } from 'react';
import './index.scss';
import { apiUserResetPwd } from 'api/axios';

// regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}';

function NewPwd() {
  const [newPassword, setNewPasswords] = useState<string>('');
  const [confirmNewPassword, setconfirmNewPassword] = useState<string>('');
  const [errmsg, setErrmsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewPasswordChange = (key: any, value: any) => {
    setNewPasswords(value);
  };

  const handleConfirmNewPasswordChange = (key: any, value: any) => {
    setconfirmNewPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      setLoading(true);
      try {
        const response = await apiUserResetPwd(newPassword);
        console.log(response);
      } catch (err: any) {
        if (!err.response) {
          setErrmsg('伺服器無回應');
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

  // console.log(passwords.password);
  // console.log(passwords.confirmPassword);

  return (
    <div className="new-pwd__container">
      <div className="new-pwd__errmsg">{errmsg}</div>
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
                <Button color="secondary" text="修改" disabled={!submitGate()} />
              </div>
            )}
        </form>
      </main>
    </div>
  );
}

export default NewPwd;
