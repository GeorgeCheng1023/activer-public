import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.scss';

// components
import ButtonFrame from '../../../../components/Button';
import FormText from '../../../../components/Form/FormText';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function LoginSection() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState<boolean>(true);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState<boolean>(true);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [showErr, setShowErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showErr) setValidName(USER_REGEX.test(user));
    console.log(validName);
  }, [user]);

  useEffect(() => {
    if (showErr) setValidPwd(PWD_REGEX.test(pwd));
    console.log(validPwd);
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [userFocus]);

  useEffect(() => {
    setErrMsg('');
  }, [pwdFocus]);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowErr(true);

    // test user and pwd is correct or not
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      if (!v1) setValidName(false);
      if (!v2) setValidPwd(false);
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response: any = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      // clear state and controlled inputs
      // need value attrib on inputs for this
      setUser('');
      setPwd('');
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
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

          <section className="login-section__text-field">
            <FormText
              formStyle="default"
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
          </section>

          <p id="uidnote" className={validName ? 'offscreen' : 'instructions'}>
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <section className="login-section__text-field">
            <FormText
              formStyle="default"
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

          <p id="pwdnote" className={validPwd ? 'offscreen' : 'instructions'}>
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
