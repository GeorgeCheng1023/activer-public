import React, {
  useRef, useState, useEffect, createRef,
} from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

// components
import Button from 'components/Button';
import { apiUserVerify } from 'api/axios';
import { useCookies } from 'react-cookie';
import Model from '../Login/components/modal';

function Verify() {
  const KEY_CHECK_REGEX = /^[A-Za-z0-9]*$/;
  const WORD_REGEX = /^[A-Za-z]*$/;

  const nevigate = useNavigate();

  const [cookies] = useCookies<string>(['user']);

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
  const [verifySuccess, setVerifySuccess] = useState<string>('unverified');

  function onlyLettersAndNumbers(key: string) {
    return KEY_CHECK_REGEX.test(key);
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e);
    if (!onlyLettersAndNumbers(e.key) || e.key === 'Backspace') {
      return currentIndex;
    }

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

  const handleClick = async () => {
    // eslint-disable-next-line no-console
    let verifycode = '';
    letters.forEach((code) => { verifycode = verifycode.concat(code); });

    try {
      const response = await apiUserVerify(verifycode, cookies.sessionToken);
      console.log(response);
      setVerifySuccess('success');
    } catch (err: any) {
      console.log(err);
      if (err.status === 401) {
        console.log('驗證碼不正確或已過期');
      } else {
        console.log('伺服器懶蛋');
      }
      setVerifySuccess('failure');
    }
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
      <Model open={verifySuccess !== 'unverified'} onClose={() => setVerifySuccess('unverified')}>
        <div className="verify-user__model">
          <img className="verify-user__model__img" src="/ok.png" alt="ok" />
          <h1 className="verify-user__model__text">success</h1>
        </div>
      </Model>

      <main className="verify-user">
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
        </section>

        <Button color="secondary" text="寄出" onClick={handleClick} />
      </main>
    </div>
  );
}

export default Verify;
