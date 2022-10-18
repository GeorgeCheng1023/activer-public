import React, { useEffect, useRef } from 'react';
import ButtonFrame from '../../../../components/Button';
import FormText, { allInputFormStyle } from '../../../../components/Form/FormText';
import './index.scss';

function LoginSection() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  /*
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
*/

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  // 出事 ==
  return (
    <form method="post" className="login-section" onSubmit={handleSubmit}>
      <h1 className="login-section__title">登入</h1>
      <FormText
        formStyle={allInputFormStyle.default}
        labelText="帳號"
        placeholder="輸入您的帳號名稱或電信箱"
        inputType="text"
        ref={userRef}
      />
      <FormText
        formStyle={allInputFormStyle.default}
        labelText="密碼"
        placeholder="輸入您的密碼"
        inputType="password"
        ref={passRef}
      />
      <div className="login-section__btn-group">
        <ButtonFrame
          color="primary"
          text="登入"
        />
        <ButtonFrame
          color="primary"
          variant="outline"
          text="註冊"
        />
      </div>
      <div className="login-section__btn-footer">
        <ButtonFrame
          color="secondary"
          text="主辦方登入"
        />
      </div>
    </form>
  );
}

export default LoginSection;
