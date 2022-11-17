/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint implicit-arrow-linebreak: ["error", "beside"] */
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.accessToken);
      return { ...prev, username: response.data.username, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return (
    <>
      { isLoading
        ? <p>Loading...</p>
        : <Outlet />}
    </>
  );
}

export default PersistLogin;
