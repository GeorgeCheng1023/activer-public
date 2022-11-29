import React, {
  useState, useEffect, useRef,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';

// Slice
import { userLogin } from 'store/userAuth';

// Hook
import { useAppDispatch } from 'hooks/redux';

// Components
import ButtonFrame from '../../../../components/Button';
import FormText from '../../../../components/Form/FormText';
import GoogleLoginButton from '../GoogleLogin';

// Regex
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function LoginSection() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<string>('');
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(true);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [showErr, setShowErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showErr) setValidPwd(PWD_REGEX.test(pwd));
    // console.log(validPwd);
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [userFocus]);

  useEffect(() => {
    setErrMsg('');
  }, [pwdFocus]);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (success) && navigate(from, { replace: true });

  // const togglePersist = () => {
  //   localStorage.setItem('persist', persist);
  //   setPersist((prev: any) => !prev);
  // };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowErr(true);

    // test user and pwd is correct or not
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      if (!v2) setValidPwd(false);
      setErrMsg('');
      return;
    }

    try {
      const response = await dispatch(userLogin({ email: user, password: pwd }));
      console.log(response);
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('伺服器無回應');
      } else if (err.response?.status === 400) {
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
      <form method="post" className="login-section">
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
          <ButtonFrame
            color="primary"
            text="登入"
            onClick={
              (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)
            }
          />
          <Link to="/register">
            <ButtonFrame
              color="primary"
              variant="outline"
              text="註冊"
            />
          </Link>
        </section>
        <section className="login-section__btn-footer">
          <ButtonFrame
            color="secondary"
            text="主辦方登入"
            onClick={(e) => handleClick(e)}
          />
        </section>

      </form>

      <aside className="or-aside" />

      <section className="other-login-section">
        <GoogleLoginButton />
      </section>
    </div>
  );
}

export default LoginSection;
