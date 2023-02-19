import React from 'react';
import './index.scss';

// components
import LoginSection from './components/Login';

// components
export { default as Admin } from './components/Admin';
export { default as ResetPwd } from './components/ChangePassword';
export { default as EmailLoading } from './components/EmailLoad';
export { default as EmailVerify } from './components/EmailVerify';
export { default as ForgetPwd } from './components/ForgetPwd';
export { default as Register } from './components/Register';
export { default as Verify } from './components/verifyUser';
export { default as PersistLogin } from './components/PersistLogin';

function Login() {
  return (
    <div className="main-section">
      <LoginSection />
    </div>
  );
}

export default Login;
