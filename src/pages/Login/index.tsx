import React from 'react';
import './index.scss';

// components
import Header from '../../components/Header';
import LoginSection from './components/Login';

function Login() {
  return (
    <div className="login-container">
      <Header />
      <div className="login-section-container">
        <LoginSection />
      </div>
    </div>
  );
}

export default Login;
