import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

// components
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import { apiUserVerifyAndResetPwd } from 'api/axios';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX_PATTERN = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}';

function ForgetPwd() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [errmsg, setErrmsg] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (key: any, value: any) => {
    setEmail(value);
  };

  useEffect(() => {
    setErrmsg('');
  }, [email]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (EMAIL_REGEX.test(email)) {
      console.log('success');
      setLoading(true);
      try {
        const response = await apiUserVerifyAndResetPwd(email);
        console.log(response);
        navigate('/email/verify');
      } catch (err: any) {
        if (!err.response) {
          setErrmsg('伺服器沒有回應');
        } else {
          console.log(err);
        }
      }
      setLoading(false);
    } else {
      setErrmsg('電子信箱格式錯誤');
    }
  };

  return (
    <main className="forgot-pwd">
      <h2 className={errmsg ? 'forgot-pwd--show' : 'forgot-pwd--hide'}>
        電子信箱格式錯誤
      </h2>
      <h1 className="forgot-pwd__title">忘記密碼?</h1>
      <h3 className="forgot-pwd__subtitle">驗證電子郵件</h3>
      <div className="forgot-pwd__text-field">
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
        <p className="forgot-pwd__back-btn">回到登入畫面</p>
      </Link>

      {loading
        ? <div className="forgot-pwd__button-load-animation" />
        : (
          <div className="forgot-pwd__submit-btn">
            <Button text="寄出" color="secondary" onClick={handleClick} />
          </div>
        )}
    </main>
  );
}

export default ForgetPwd;
