import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/axios';
import { useAppDispatch } from 'hooks/redux';
import { userUpdate } from 'store/userAuth';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies<string>(['user']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { email, sessionToken } = cookies;

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(email, sessionToken);

        if (response.data.Status === 1) {
          dispatch(userUpdate(response.data));
        }

        console.log(response);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    verifyUser();
  }, []);

  return (
    isLoading ? <Loading /> : <Outlet />
  );
}

export default PersistLogin;
