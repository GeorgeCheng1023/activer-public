import React, {
  useState, useEffect, useRef,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './index.scss';

// Slice
import {
  getUserData, setEmail, setPassword, userLogin,
} from 'store/userAuth';

// Components
import FAQTag from 'components/FAQ-Tag';
import { apiUserLogin, apiUserResendVerify } from 'api/axios';
import { useAppSelector } from 'hooks/redux';
import Button from '../../../../components/Button';
import GoogleLoginButton from '../GoogleLogin';
import { useAppDispatch } from '../../../../hooks/redux/index';
import Modal from './components/modal';
import FormInput from '../../../../components/Form/FormInput/index';

// Regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX_STR = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$';

function LoginSection() {
  const dispatch = useAppDispatch();
  const userData: any = useAppSelector(getUserData);

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies<string>(['user']);

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<string>('');

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(true);

  const handleUserChange = (key: any, value: any) => {
    setUser(value);
  };

  const handlePwdChange = (key: any, value: any) => {
    setPwd(value);
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd) || pwd === '');
  }, [pwd]);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      if (!v2) setValidPwd(false);
      setErrMsg('');
      return;
    }

    try {
      const response: any = await apiUserLogin({ email: user, password: pwd });

      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getMinutes + response.data.token.expireIn);

      setCookie('sessionToken', response.data.token.accessToken, {
        expires: expiresDate,
        path: '/',
        sameSite: true,
      });

      if (response.data.user.verify === false) {
        console.log('Account is unverified');
        setEmailVerified(false);
        dispatch(setEmail(response.data.user.email));
        dispatch(setPassword(pwd));
      } else {
        dispatch(userLogin(response.data.user));

        navigate('/user/basic', { replace: true });
      }
      return;
    } catch (err: any) {
      console.log(err.response);
      if (!err.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response?.status === 401) {
        setErrMsg('帳號或密碼有誤');
      } else {
        setErrMsg('伺服器懶蛋');
      }
      errRef.current?.focus();
    }
  };

  const hideEmail = (email: string) => {
    if (email) {
      return email.replace(email.slice(1, 4), '****');
    }
  };

  const handleVerifyClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const response = await apiUserResendVerify(cookies.sessionToken);
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    navigate('/verify');
  };

  return (
    <div className="login-container">

      <Modal open={!emailVerified} onClose={() => setEmailVerified(true)}>
        <div className="email-verify">
          <figure className="email-verify__figure">
            <img className="email-verify__figure__img" src="/envelope.png" alt="Email" />
            <figcaption className="email-verify__figure__caption">您的電子信箱未驗證</figcaption>
          </figure>
          <h4 className="email-verify__text">
            <br />
            我們將發送了一封驗證信到
            {hideEmail(userData.email) || '******@gamil.com'}
            <br />
            您需要驗證您的電子郵件地址才能登錄
          </h4>

          <div className="email-verify__button">
            <Button color="primary" text="驗證電子郵件" onClick={handleVerifyClick} />
          </div>
        </div>
      </Modal>

      <main className="login-section">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <h1 className="login-section__title">登入</h1>

        <section className="login-section__text-field">
          <FormInput
            id="user"
            label="帳號"
            placeholder="輸入您的電子信箱"
            type="email"
            onChange={handleUserChange}
            formValue={user}
            required
          />
        </section>

        <section className="login-section__text-field">
          <FormInput
            id="password"
            label="密碼"
            placeholder="輸入您的密碼"
            type="password"
            onChange={handlePwdChange}
            pattern={PWD_REGEX_STR}
            formValue={pwd}
            required
          />
        </section>

        <div className="login-section__pwd-tag">
          <FAQTag title="忘記密碼?" url="/forgetpwd" />
        </div>

        {/* <section className="login-section__check-persist-section">
          <input type="checkbox" id="persist" onChange={togglePersist} />
          <label htmlFor="persist">Trust This Device</label>
        </section> */}

        <p id="pwdnote" className={validPwd ? 'offscreen' : 'pwd-instructions'}>
          密碼至少八位字元，需要包含至少一個數字、一個大寫英文、一個小寫英文、一個特殊字元
          <br />
          特殊字元為 :
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>

        <section className="login-section__btn-group">
          <Button
            color="primary"
            type="button"
            text="登入"
            onClick={
              (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)
            }
          />
          <Link to="/register">
            <Button
              color="primary"
              type="button"
              variant={{ outline: true }}
              text="註冊"
            />
          </Link>
        </section>

      </main>

      <aside className="or-aside" />

      <section className="other-login-section">
        <GoogleLoginButton />
      </section>
    </div>
  );
}

export default LoginSection;
