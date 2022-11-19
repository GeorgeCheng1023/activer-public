/* eslint-disable no-console */
import React from 'react';
import './index.scss';
import axios from 'api/axios';

function TextGoogleLoginButton() {
  const handleClick = async () => {
    try {
      const response = await axios.get('/auth/google');
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className="google-button" type="button" onClick={handleClick}>
      <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
      Sign in with Google
    </button>
  );
}

export default TextGoogleLoginButton;
