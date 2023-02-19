/* eslint-disable no-console */
import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/user';
import { useAppDispatch } from 'hooks/redux';
import { setBirthday, userUpdate } from 'store/userAuth';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies<string>(['user']);
  const dispatch = useAppDispatch();
  const dateFormat = /\d{4}-\d{2}-\d{2}/;

  useEffect(() => {
    const { sessionToken } = cookies;

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(sessionToken);
        dispatch(userUpdate(response.data.user));
        const date = response.data.user.birthday.match(dateFormat);
        if (date) dispatch(setBirthday(date[0]));

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getMinutes() + response.data.token.expireIn);

        setCookie('sessionToken', response.data.token.accessToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });

        setIsLoading(false);
      } catch (err: any) {
        if (err.status === 401) {
          console.log('驗證失敗');
        }
        setIsLoading(false);
      }
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
