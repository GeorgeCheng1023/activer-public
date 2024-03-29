import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './index.scss';

// api
import { apiUserRegister } from 'api/user';

// redux
import { updateUser, getUserData } from 'store/user';
import { useAppDispatch, useAppSelector } from 'hooks/redux/index';

// components
import { Alert, Fade } from '@mui/material';
import FormInput from 'components/Form/FormInput';
import Button from '../../../../components/Button';

function Register() {
  // Regex
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  // eslint-disable-next-line no-useless-escape
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const [user, setUser] = useState<string>('');

  const [email, setUserEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState<boolean>(true);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validConfirmPwd, setValidConfirmPwd] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [, setCookie] = useCookies<string>(['user']);

  // check norm
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, email]);

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

  // input
  const handleUserChange = (key: any, value: any) => {
    setUser(value);
  };

  const handleEmailChange = (key: any, value: any) => {
    setUserEmail(value);
  };

  const handlePwdChange = (key: any, value: any) => {
    setPwd(value);
  };

  const handleConfirmPwdChange = (key: any, value: any) => {
    setConfirmPwd(value);
  };

  // register
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

    setLoading(true);
    try {
      const response = await apiUserRegister(user, email, pwd);
      navigate('/verify');

      dispatch(updateUser({ ...userData, realName: user, email }));

      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getMinutes() + response.data.token.expireIn);

      setCookie('sessionToken', response.data.token.accessToken, {
        expires: expiresDate,
        path: '/',
        sameSite: true,
      });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response?.status === 400) {
        setErrMsg('帳號和密碼不能空白');
      } else if (err.response?.status === 409) {
        setErrMsg('電子郵件已被註冊過');
      } else {
        setErrMsg('註冊失敗');
      }
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <form className="register-section">

        <div className="register-section__err-msg-section">
          <Fade in={errMsg !== ''}>
            <Alert severity="error">
              <div className="register-section__err-msg">{errMsg}</div>
            </Alert>
          </Fade>
        </div>

        <h1 className="register-section__title">註冊</h1>

        <section className="register-section__text-field">
          <FormInput
            id="username"
            name="username"
            label="名稱"
            type="text"
            placeholder="輸入您的名稱"
            formValue={user}
            onChange={handleUserChange}
          />
        </section>

        <section className="register-section__text-field">
          <FormInput
            id="email"
            name="email"
            label="電子信箱"
            type="email"
            placeholder="輸入您的電子信箱"
            formValue={email}
            onChange={handleEmailChange}
          />
        </section>

        <p id="pwdnote" className={validEmail ? 'offscreen' : 'register-section__register-error'}>
          電子信箱格式錯誤
        </p>

        <section className="register-section__text-field">
          <FormInput
            id="password"
            name="password"
            label="密碼"
            type="password"
            placeholder="輸入您的密碼"
            formValue={pwd}
            onChange={handlePwdChange}
          />
        </section>

        <p id="pwdnote" className={validPwd ? 'offscreen' : 'register-section__register-error'}>
          密碼至少八位字元，需要包含至少一個數字、一個大寫英文、一個小寫英文、一個特殊字元
          <br />
          特殊字元為 :
          <span className="register-section__register-error__symbol" aria-label="exclamation mark">!</span>
          <span className="register-section__register-error__symbol" aria-label="at symbol">@</span>
          <span className="register-section__register-error__symbol" aria-label="hashtag">#</span>
          <span className="register-section__register-error__symbol" aria-label="dollar sign">$</span>
          <span className="register-section__register-error__symbol" aria-label="percent">%</span>
        </p>

        <section className="register-section__text-field">
          <FormInput
            id="confirm-password"
            name="confirm-password"
            label="確認密碼"
            type="password"
            placeholder="確認密碼"
            formValue={confirmPwd}
            onChange={handleConfirmPwdChange}
          />
        </section>

        <p id="pwdnote" className={validConfirmPwd ? 'offscreen' : 'register-section__register-error'}>
          需要和密碼相同
        </p>

        {!loading
          ? (
            <div className="register-section__button">
              <Button
                type="submit"
                color="primary"
                variant={{ outline: true }}
                text="註冊"
                onClick={(e) => handleClick(e)}
              />
            </div>
          )
          : <div className="register-section__load-animation" />}
      </form>
    </div>
  );
}

export default Register;
