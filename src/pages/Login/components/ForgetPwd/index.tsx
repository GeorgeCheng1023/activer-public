import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX_PATTERN = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

function ForgetPwd() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const handleChange = (key: any, value: any) => {
    setEmail(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (EMAIL_REGEX.test(email)) {
      navigate('/verify');
    }
  };

  return (
    <main className="forgot-pwd">
      <h1 className="forgot-pwd__title">忘記密碼?</h1>
      <div className="forgot-pwd__text-field">
        <FormInput
          inputProps={{
            id: 'nick_name',
            name: 'NickName',
            inputType: 'text',
            label: '電子信箱驗證',
            placeholder: '電子信箱驗證',
            errorMessage: '電子信箱格式錯誤',
            pattern: EMAIL_REGEX_PATTERN,
          }}
          formValue={email}
          onChange={handleChange}
        />
      </div>
      <div className="forgot-pwd__submit-btn">
        <Button text="寄出驗證碼" color="secondary" onClick={handleClick} />
      </div>
    </main>
  );
}

export default ForgetPwd;
