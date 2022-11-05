import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
import axios from 'axios';

// components
import Button from '../../../../components/Button';
import FAQTag from '../../../../components/FAQ-Tag';

// Regex
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = 'http://localhost:3500/api/register';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState<boolean>(true);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>('');
  const [showErr, setShowErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (showErr) setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    if (showErr) setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    if (showErr) setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    if (showErr) setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  if (success) {
    navigate(from, { replace: true });
  }

  const handleClick = async (event: React.MouseEvent<HTMLElement>, targetUrl: string) => {
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

    // axios
    try {
      const response: any = await axios.post(
        targetUrl,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      const isRegistered = response?.data.isRegistered;

      if (isRegistered) {
        setErrMsg('Username has been used');
      } else {
        setSuccess(true);
      }

      // console.log('Submit Successfully');
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  return (
    <div className="register-container">
      <section className="register-section">
        <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <h1 className="register-section__title">Sign Up</h1>

        <input
          className="register-section__text-field"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <p id="uidnote" className={validName ? 'offscreen' : 'instructions'}>
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <input
          className="register-section__text-field"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />

        <input
          className="register-section__text-field"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <span className="register-section__tag">
          <FAQTag title="forget password?" dataMsg="press here" url="/Register" />
        </span>

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

        <input
          className="register-section__text-field"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
        />

        <footer className="register-section__button">
          <Button
            color="primary"
            variant="outline"
            text="註冊"
            onClick={(e) => handleClick(e, REGISTER_URL)}
          />
        </footer>
      </section>
    </div>
  );
}

export default Register;
