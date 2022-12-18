import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

// components
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX_PATTERN = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';

function ResetPwd() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const handleChange = (key: any, value: any) => {
    setEmail(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      navigate('/verify');
    }
  };

  return (
    <main className="Reset-pwd">
      <h1 className="Reset-pwd__title">修改密碼</h1>
      <h3 className="Reset-pwd__subtitle">輸入電子郵件</h3>
      <div className="Reset-pwd__text-field">
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder="電子信箱"
          errorMessage="電子信箱格式錯誤"
          pattern={EMAIL_REGEX_PATTERN}
          formValue={email}
          onChange={handleChange}
        />
      </div>
      <Link to="/login">
        <p className="Reset-pwd__back-btn">回到登入畫面</p>
      </Link>

      <div className="Reset-pwd__submit-btn">
        <Button text="寄出" color="secondary" onClick={handleClick} />
      </div>
    </main>
  );
}

export default ResetPwd;
