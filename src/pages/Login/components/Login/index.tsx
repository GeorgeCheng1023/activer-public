import React, { useState, useEffect, useRef } from 'react';
import ButtonFrame from '../../../../components/Button';
import FormText, { allInputFormStyle } from '../../../../components/Form/FormText';
import './index.scss';

function LoginSection() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  /*
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
*/

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    console.log(userRef.current?.value, passRef.current?.value);
  }, [user, pwd]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    // axios
    event.preventDefault();
    console.log(userRef.current?.value, passRef.current?.value);
  };

  // 出事 ==
  return (
    <form method="post" className="login-section">
      <h1 className="login-section__title">登入</h1>
      <FormText
        formStyle={allInputFormStyle.default}
        labelText="帳號"
        placeholder="輸入您的帳號名稱或電信箱"
        inputType="text"
        ref={userRef}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
        value={user}
      />
      <FormText
        formStyle={allInputFormStyle.default}
        labelText="密碼"
        placeholder="輸入您的密碼"
        inputType="password"
        ref={passRef}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
        value={pwd}
      />
      <div className="login-section__btn-group">
        <ButtonFrame
          color="primary"
          text="登入"
          onClick={handleSubmit}
        />
        <ButtonFrame
          color="primary"
          variant="outline"
          text="註冊"
          onClick={handleSubmit}
        />
      </div>
      <div className="login-section__btn-footer">
        <ButtonFrame
          color="secondary"
          text="主辦方登入"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default LoginSection;
