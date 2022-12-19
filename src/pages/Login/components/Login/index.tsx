import React, {
  useState, useEffect, useRef,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './index.scss';

// Slice
import { userLogin, getUserData } from 'store/userAuth';

// Hook
import { useAppDispatch, useAppSelector } from 'hooks/redux';

// Components
import FAQTag from 'components/FAQ-Tag';
import Button from '../../../../components/Button';
import FormText from '../../../../components/Form/FormText';
import GoogleLoginButton from '../GoogleLogin';

// Regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function LoginSection() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [, setCookie] = useCookies<string>(['user']);

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<string>('');
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(true);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [userFocus]);

  useEffect(() => {
    setErrMsg('');
  }, [pwdFocus]);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      if (!v2) setValidPwd(false);
      setErrMsg('');
      return;
    }

    try {
      const response: any = await dispatch(userLogin({ email: user, password: pwd }));
      console.log(response.meta.requestStatus);
      if (response.meta.requestStatus === 'rejected') {
        setErrMsg('帳號或密碼有誤');
        return;
      }
      if (response.meta.requestStatus === 'fulfilled') {
        navigate(from, { replace: true });

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 1);

        setCookie('sessionToken', response.payload.data.SessionToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });
      }
    } catch (err: any) {
      console.log(userData);
      if (!err?.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response?.status === 400) {
        console.log('400');
        setErrMsg('帳號和密碼不能空白');
      } else if (err.response?.status === 401) {
        setErrMsg('帳號或密碼有誤');
      } else {
        setErrMsg('登入失敗');
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="login-container">
      <main className="login-section">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <h1 className="login-section__title">登入</h1>

        <section className="login-section__text-field">
          <FormText
            variant="default"
            labelText="帳號"
            placeholder="輸入您的電子信箱"
            inputType="email"
            ref={userRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
            value={user}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            required
          />
        </section>

        <section className="login-section__text-field">
          <FormText
            variant="default"
            labelText="密碼"
            placeholder="輸入您的密碼"
            inputType="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
            value={pwd}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
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
