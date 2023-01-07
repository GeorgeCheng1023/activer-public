import Button from 'components/Button';
import FormInput from 'components/Form/FormInput';
import React, { useState } from 'react';
import './index.scss';

// regex
const PWD_REGEX_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}';

function NewPwd() {
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });

  const handleChange = (key: any, value: any) => {
    setPasswords({ ...passwords, [key]: value });
  };

  return (
    <div className="new-pwd__container">
      <main className="new-pwd">
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
            onChange={handleChange}
            formValue={passwords.password}
          />
        </div>

        <h3 className="new-pwd__subtitle">確認密碼</h3>

        <div className="new-pwd__text-field">
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="確認密碼"
            pattern={passwords.password}
            errorMessage="密碼格式錯誤"
            onChange={handleChange}
            formValue={passwords.password}
          />
        </div>

        <div className="new-pwd__submit-btn">
          <Button color="secondary" text="修改" />
        </div>

      </main>
    </div>
  );
}

export default NewPwd;
