import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

// api
import { apiUserRegister } from 'api/axios';

// components
import FormInput from 'components/Form/FormInput';
import Button from '../../../../components/Button';

// Regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState<boolean>(true);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validConfirmPwd, setValidConfirmPwd] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setErrMsg('');
  }, [user]);

  useEffect(() => {
    setErrMsg('');
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email]);

  useEffect(() => {
    if (!pwd || PWD_REGEX.test(pwd)) {
      setValidPwd(true);
    } else {
      setValidPwd(false);
    }
  }, [pwd]);

  useEffect(() => {
    if (!confirmPwd || confirmPwd === pwd) {
      setValidConfirmPwd(true);
    } else {
      setValidConfirmPwd(false);
    }
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (!email || EMAIL_REGEX.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  if (success) {
    navigate('/login', { replace: true });
  }

  const handleUserChange = (key: any, value: any) => {
    setUser(value);
  };

  const handleEmailChange = (key: any, value: any) => {
    setEmail(value);
  };

  const handlePwdChange = (key: any, value: any) => {
    setPwd(value);
  };

  const handleConfirmPwdChange = (key: any, value: any) => {
    setConfirmPwd(value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!user || !pwd || !email) {
      setErrMsg('帳號、密碼和電子郵件不能空白');
      return;
    }

    const v1 = pwd === confirmPwd;
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2) {
      setErrMsg('帳號或密碼錯誤');
      return;
    }
    if (!v3) {
      setErrMsg('電子信箱格式錯誤');
      return;
    }

    try {
      const response = await apiUserRegister(user, email, pwd);
      // eslint-disable-next-line no-console
      console.log(response);
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response?.status === 400) {
        setErrMsg('帳號和密碼不能空白');
      } else if (err.response?.status === 409) {
        setErrMsg('該名稱已註冊過');
      } else {
        setErrMsg('註冊失敗');
      }
    }
  };

  return (
    <div className="register-container">
      <section className="register-section">
        <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <h1 className="register-section__title">註冊</h1>

        <section className="register-section__text-field">
          <FormInput
            inputProps={{
              id: 'username',
              name: 'username',
              label: '帳號',
              inputType: 'text',
              placeholder: '輸入您的姓名',
            }}
            formValue={user}
            onChange={handleUserChange}
          />
        </section>

        <section className="register-section__text-field">
          <FormInput
            inputProps={{
              id: 'email',
              name: 'email',
              label: '電子信箱',
              inputType: 'email',
              placeholder: '輸入您的電子信箱',
            }}
            formValue={email}
            onChange={handleEmailChange}
          />
        </section>

        <p id="pwdnote" className={validEmail ? 'offscreen' : 'register-section__register-error'}>
          電子信箱格式錯誤
        </p>

        <section className="register-section__text-field">
          <FormInput
            inputProps={{
              id: 'password',
              name: 'password',
              label: '密碼',
              inputType: 'password',
              placeholder: '輸入您的密碼',
            }}
            formValue={pwd}
            onChange={handlePwdChange}
          />
        </section>

        <p id="pwdnote" className={validPwd ? 'offscreen' : 'register-section__register-error'}>
          密碼至少八位字元，需要包含至少一個數字、一個大寫英文、一個小寫英文、一個特殊字元
          <br />
          特殊字元為 :
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>

        <section className="register-section__text-field">
          <FormInput
            inputProps={{
              id: 'confirm-password',
              name: 'confirm-password',
              label: '確認密碼',
              inputType: 'password',
              placeholder: '確認密碼',
            }}
            formValue={confirmPwd}
            onChange={handleConfirmPwdChange}
          />
        </section>

        <p id="pwdnote" className={validConfirmPwd ? 'offscreen' : 'register-section__register-error'}>
          需要和密碼相同
        </p>

        <footer className="register-section__button">
          <Button
            color="primary"
            variant="outline"
            text="註冊"
            onClick={(e) => handleClick(e)}
          />
        </footer>
      </section>
    </div>
  );
}

export default Register;
