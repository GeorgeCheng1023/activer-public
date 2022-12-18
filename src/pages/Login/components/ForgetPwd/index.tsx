import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

// components
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';

// eslint-disable-next-line no-useless-escape
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line no-useless-escape
const PWD_REGEX_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}';

function ForgetPwd() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const handleChange = (key: any, value: any) => {
    setEmail(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!PWD_REGEX.test(email)) {
      navigate('/verify');
    }
  };

  return (
    <main className="forgot-pwd">
      <h1 className="forgot-pwd__title">忘記密碼?</h1>
      <h3 className="forgot-pwd__subtitle">輸入電子郵件</h3>
      <div className="forgot-pwd__text-field">
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder="電子信箱"
          errorMessage="電子信箱格式錯誤"
          pattern={PWD_REGEX_PATTERN}
          formValue={email}
          onChange={handleChange}
        />
      </div>
      <Link to="/login">
        <p className="forgot-pwd__back-btn">回到登入畫面</p>
      </Link>

      <div className="forgot-pwd__submit-btn">
        <Button text="寄出" color="secondary" onClick={handleClick} />
      </div>
    </main>
  );
}

export default ForgetPwd;
