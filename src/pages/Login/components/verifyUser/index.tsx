import React from 'react';
import './index.scss';

// components
import Button from 'components/Button';
import { Link } from 'react-router-dom';

function VerifyUser() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key;
    if (/[0-9]/.test(keyCode) || keyCode === 'Backspace') {
      return e.key;
    }
  };

  return (
    <div className="verify-user__container">
      <main className="verify-user">
        <h1 className="verify-user__title">輸入驗證碼</h1>

        <section className="verify-user__section">
          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-1"
              name="verify-code-1"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>

          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-2"
              name="verify-code-2"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>

          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-3"
              name="verify-code-3"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>

          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-4"
              name="verify-code-4"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>

          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-5"
              name="verify-code-5"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>

          <div className="verify-user__section__code">
            <input
              className="verify-user__section__number"
              id="verify-code-6"
              name="verify-code-6"
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          </div>
        </section>

        <section className="verify-user__resend">
          <h5 className="verify-user__resend__text">未收到驗證碼?</h5>
          <Link to="/password">
            <h5 className="verify-user__resend__btn">
              重新驗證
            </h5>
          </Link>
        </section>

        <Button color="secondary" text="寄出" />
      </main>
    </div>
  );
}

export default VerifyUser;
