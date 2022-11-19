/* eslint-disable no-console */
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './index.scss';

// hook
import useAuth from 'hooks/useAuth';

// axios
import axios from 'axios';
import rAxios from '../../../../api/axios';

interface type {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

function GoogleLoginButton({ setSuccess }: type) {
  const { setAuth }: any = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const data = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          },
        );

        const response = await rAxios.post(
          '/google/login',
          JSON.stringify(data.data),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );

        setAuth({
          username: response.data.userData.name,
          accessToken: response.data.accessToken,
          picture: response.data.userData.picture,
        });
        setSuccess(true);
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
      <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" />
      Sign in with Google
    </button>
  );

  // function handleCredentialResponse(response: any) {
  //   console.log(`Encoded JWT ID Token${response.credential}`);
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: 'tg3voh22qmia7rf2723gnmpkop983j23.apps.googleusercontent.com',
  //     callback: handleCredentialResponse,
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById('google-login'),
  //     { theme: 'outline', size: 'large' },
  //   );
  // }, []);

  // return (
  //   <div id="google-login" />
  // );
}

export default GoogleLoginButton;
