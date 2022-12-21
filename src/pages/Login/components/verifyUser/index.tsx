import React, {
  useRef, useState, useEffect, createRef,
} from 'react';
import './index.scss';

// components
import Button from 'components/Button';
import { Link } from 'react-router-dom';

function Verify() {
  // const codeId = [0, 1, 2, 3, 4, 5];
  // const [verifyCode, setVerifyCode] = useState<Array<string>>([]);
  // const [errorMsg, setErrorMsg] = useState<string>();

  const verifyCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    verifyCodeRef.current?.focus();
  }, []);

  // const handleClick = () => {
  //   verifyCode.forEach((code) => {
  //     if (code === '') {
  //       console.log('error');
  //     }
  //   });
  //   if (verifyCode.length < 6) {
  //     console.log('error');
  //     return;
  //   }
  //   console.log(verifyCode);
  //   setErrorMsg('驗證碼未填完成');
  // };

  const numerOfInputs = 6;
  const [inputRefsArray] = useState<React.RefObject<any>[]>(
    () => Array.from({ length: numerOfInputs }, () => createRef()),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [letters, setLetters] = useState(() => Array.from({ length: numerOfInputs }, () => ''));

  const handleKeyPress = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex < numerOfInputs - 1 ? prevIndex + 1 : 0;
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      nextInput.focus();
      nextInput.select();
      return nextIndex;
    });
  };

  const handleClick = () => {
    console.log(currentIndex, letters);
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
        <h1 className="verify-user__title">輸入驗證碼</h1>

        <section className="verify-user__section">

          {/* {
            codeId.map((index) => (
              <div key={index} className="verify-user__section__code">
                <input
                  className="verify-user__section__number"
                  id={`verify-code-${index}`}
                  name={`verify-code-${index}`}
                  type="text"
                  maxLength={1}
                  placeholder={index.toString()}
                  onChange={
                    (e) => setVerifyCode((prev: Array<string>) => {
                      // eslint-disable-next-line no-param-reassign
                      prev[index] = e.target.value;
                      return prev;
                    })
                  }
                  ref={index === 0 ? verifyCodeRef : null}
                  value={verifyCode[index]}
                />
              </div>
            ))
          } */}

          {inputRefsArray.map((ref, index) => (
            <div key={index} className="verify-user__section__code">
              <input
                className="verify-user__section__number"
                ref={ref}
                type="text"
                maxLength={1}
                id={`box${index}-1`}
                onChange={(e) => {
                  const { value } = e.target;
                  setLetters(
                    (theLetters) => theLetters.map(
                      (letter, letterIndex) => (letterIndex === index ? value : letter),
                    ),
                  );
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
          <Link to="/forgetpwd">
            <h5 className="verify-user__resend__btn">
              重新驗證
            </h5>
          </Link>
        </section>

        <Button color="secondary" text="寄出" onClick={handleClick} />
      </main>
    </div>
  );
}

export default Verify;
