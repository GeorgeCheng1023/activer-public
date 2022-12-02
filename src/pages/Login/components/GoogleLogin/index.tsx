/* eslint-disable no-console */
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './index.scss';

// axios
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const data = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userin  o',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          },
        );

        console.log(data);

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
