import React, {
  useRef, useState, useEffect,
} from 'react';
import './index.scss';

// components
import Button from 'components/Button';
import { Link } from 'react-router-dom';

function Verify() {
  const codeId = [0, 1, 2, 3, 4, 5];
  const [verifyCode, setVerifyCode] = useState<Array<string>>([]);
  // const [errorMsg, setErrorMsg] = useState<string>();

  const verifyCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    verifyCodeRef.current?.focus();
  }, []);

  const handleClick = () => {
    verifyCode.forEach((code) => {
      if (code === '') {
        console.log('error');
      }
    });
    if (verifyCode.length < 6) {
      console.log('error');
      return;
    }
    console.log(verifyCode);
    // setErrorMsg('驗證碼未填完成');
  };

  return (
    <div className="verify-user__container">
      <main className="verify-user">
        <h1 className="verify-user__title">輸入驗證碼</h1>

        <section className="verify-user__section">

          {
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
          }

        </section>

        <section className="verify-user__resend">
          <h5 className="verify-user__resend__text">未收到驗證碼?</h5>
          <Link to="/password">
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
