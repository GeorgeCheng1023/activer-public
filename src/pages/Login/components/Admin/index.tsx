import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/user';
import { setBirthday, userUpdate } from 'store/userAuth';
import { useAppDispatch } from 'hooks/redux';

function Admin() {
  const [cookies, setCookie] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dateFormat = /\d{4}-\d{2}-\d{2}/;

  useEffect(() => {
    const { sessionToken } = cookies;
    if (!sessionToken) {
      navigate('/login');
    }

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(sessionToken);
        dispatch(userUpdate(response.data.user));
        const date = response.data.user.birthday.match(dateFormat);
        dispatch(setBirthday(date[0]));

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getMinutes + response.data.token.expireIn);

        setCookie('sessionToken', response.data.token.accessToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });
        setLoading(false);
      } catch (err: any) {
        if (err.status === 401) {
          console.log('Admin page 驗證失敗');
        }
        navigate('/', { replace: true });
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    loading ? <Loading /> : <Outlet />
  );
}

export default Admin;
