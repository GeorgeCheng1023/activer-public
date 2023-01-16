/* eslint-disable no-console */
import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/axios';
import { useAppDispatch } from 'hooks/redux';
import { userUpdate } from 'store/userAuth';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies<string>(['user']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { sessionToken } = cookies;

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(sessionToken);
        dispatch(userUpdate(response.data.user));

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getMinutes + response.data.token.expireIn);

        setCookie('sessionToken', response.data.token.accessToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });

        console.log(response);
      } catch (err: any) {
        if (err.status === 401) {
          console.log('驗證失敗');
        }
        console.log(err);
        navigate('/', { replace: true });
      }

      setIsLoading(false);
    };

    verifyUser();
  }, []);

  let element;
  if (isLoading) {
    element = <Loading />;
  } else {
    element = <Outlet />;
  }

  return (
    element
  );
}

export default PersistLogin;
