import React, {
  useRef, useState, useEffect, createRef,
} from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

// components
import Button from 'components/Button';
import { apiUserVerify } from 'api/user';
import { useCookies } from 'react-cookie';
import { Alert, Fade } from '@mui/material';

function Verify() {
  const KEY_CHECK_REGEX = /^[A-Za-z0-9]*$/;
  const WORD_REGEX = /^[A-Za-z]*$/;

  const nevigate = useNavigate();
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

  const [cookies] = useCookies<string>(['user']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errmsg, setErrmsg] = useState<string>('');

  const verifyCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    verifyCodeRef.current?.focus();
  }, []);

  const numerOfInputs = 6;
  const [inputRefsArray] = useState<React.RefObject<any>[]>(
    () => Array.from({ length: numerOfInputs }, () => createRef()),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState(() => Array.from({ length: numerOfInputs }, () => ''));

  function onlyLettersAndNumbers(key: string) {
    return KEY_CHECK_REGEX.test(key);
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!onlyLettersAndNumbers(e.key) || e.key === 'Backspace') {
      return currentIndex;
    }

    setDisplaySuccess(false);
    setErrmsg('');

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex < numerOfInputs - 1 ? prevIndex + 1 : prevIndex;
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      nextInput.focus();
      nextInput.select();
      return nextIndex;
    });
  };

  const handleBack = () => {
    nevigate(-1);
  };

  const handleClear = () => {
    setLetters(() => Array.from({ length: numerOfInputs }, () => ''));
    inputRefsArray?.[0]?.current?.focus();
    inputRefsArray?.[0]?.current?.select();
    setCurrentIndex(0);
  };

  const handleClick = async () => {
    setIsLoading(true);
    let verifycode = '';
    letters.forEach((code) => { verifycode = verifycode.concat(code); });

    try {
      await apiUserVerify(verifycode, cookies.sessionToken);
      nevigate('/login', { replace: true });
    } catch (err: any) {
      if (err.response.status === 401) {
        setErrmsg('驗證碼不正確或已過期');
        setDisplaySuccess(true);
      } else {
        // eslint-disable-next-line no-console
        console.log('伺服器懶蛋');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (inputRefsArray?.[0]?.current) {
      inputRefsArray?.[0]?.current?.focus();
    }

    window.addEventListener('keyup', handleKeyPress, false);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <div className="verify-user__container">
      <main className="verify-user">

        {/* update user data successfully */}
        <div className="verify-user__error-msg-section">
          <Fade in={displaySuccess}>
            <Alert severity="error"><p className="verify-user__errmsg">{errmsg}</p></Alert>
          </Fade>
        </div>

        <h1 className="verify-user__title">輸入驗證碼</h1>

        <section className="verify-user__section">
          {inputRefsArray.map((ref, index) => (
            <div key={index} className={`verify-user__section__code ${currentIndex === index && 'verify-user__section__code--focus'}`}>
              <input
                className="verify-user__section__number "
                ref={ref}
                type="text"
                maxLength={1}
                id={`box${index}-1`}
                onChange={(e) => {
                  let { value } = e.target;
                  if (onlyLettersAndNumbers(value)) {
                    if (WORD_REGEX.test(value)) {
                      value = value.toUpperCase();
                    }
                    setLetters(
                      (theLetters) => theLetters.map(
                        (letter, letterIndex) => (letterIndex === index ? value : letter),
                      ),
                    );
                  } else {
                    setLetters(letters);
                  }
                }}
                onClick={(e: any) => {
                  setCurrentIndex(index);
                  e.target.select();
                }}
                value={letters[index]}
              />
            </div>
          ))}

        </section>

        <section className="verify-user__resend">
          <h5 className="verify-user__resend__text">未收到驗證碼?</h5>
          <button className="verify-user__resend__btn" type="button" onClick={handleBack}>
            重新驗證
          </button>
          <button className="verify-user__resend__btn" type="button" onClick={handleClear}>
            全部清除
          </button>
        </section>

        {isLoading
          ? <div className="verify-user__load-animation" />
          : <Button color="secondary" text="寄出" onClick={handleClick} />}
      </main>
    </div>
  );
}

export default Verify;
