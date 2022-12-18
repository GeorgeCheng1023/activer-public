/* eslint-disable no-console */
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserGoogleData } from 'store/userAuth';
import { useAppDispatch } from 'hooks/redux';

function GoogleLoginButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const response = await dispatch(getUserGoogleData(respose.access_token));
        console.log(response);
        console.log(respose);
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error :any) => {
      console.log(error);
    },
  });

  return (
    <button className="google-button" type="button" onClick={() => login()}>
      <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
