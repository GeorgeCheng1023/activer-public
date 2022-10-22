import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// components
import ButtonFrame from '../../../../components/Button';
import FormText, { allInputFormStyle } from '../../../../components/Form/FormText';

function LoginSection() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [showUserErr, setShowUserErr] = useState<boolean>(false);
  const [showPwdErr, setShowPwdErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
  // test
    setValidName(false);
  }, [user]);

  useEffect(() => {
  // test
    setValidPwd(false);
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
    setShowUserErr(true);
    setShowPwdErr(true);
  }, [userFocus, pwdFocus]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // axios
    event.preventDefault();
    // test user and pwd is correct

    /*
      if not success
        errMsg = 'error'
    */

    if (validName && validPwd) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setErrMsg('error');
      setShowUserErr(true);
      setShowPwdErr(true);
      setUser('');
      setPwd('');
      errRef.current?.focus();
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/">Go To Home</Link>
          </p>
        </section>
      ) : (
        <form method="post" className="login-section">
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          <h1 className="login-section__title">登入</h1>
          <FormText
            formStyle={allInputFormStyle.default}
            labelText="帳號"
            placeholder="輸入您的帳號名稱或電信箱"
            inputType="text"
            ref={userRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
            value={user}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            required
          />

          <p id="uidnote" className={showUserErr ? 'instructions' : 'offscreen'}>
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <FormText
            formStyle={allInputFormStyle.default}
            labelText="密碼"
            placeholder="輸入您的密碼"
            inputType="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
            value={pwd}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          />

          <p id="pwdnote" className={showPwdErr ? 'instructions' : 'offscreen'}>
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special character.
            <br />
            Allowed special characters:
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
              onClick={handleClick}
            />
            <ButtonFrame
              color="primary"
              variant="outline"
              text="註冊"
              onClick={handleClick}
            />
          </section>
          <section className="login-section__btn-footer">
            <ButtonFrame
              color="secondary"
              text="主辦方登入"
              onClick={handleClick}
            />
          </section>
        </form>
      )}
    </div>
  );
}

export default LoginSection;
