/* eslint-disable no-console */
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './index.scss';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserGoogleData } from 'store/user';
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
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <button className="google-button" type="button" onClick={() => login()}>
      <FcGoogle />
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
