import React from 'react';
import './index.scss';

// components
import LoginSection from './components/Login';

function Login() {
  return (
    <div className="login-container">
      <div className="login-section-container">
        <LoginSection />
      </div>
    </div>
  );
}

export default Login;
