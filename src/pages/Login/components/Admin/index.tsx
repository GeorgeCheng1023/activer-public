import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/user';
// import { userUpdate } from 'store/userAuth';
// import { useAppDispatch } from 'hooks/redux';

function Admin() {
  const [cookies, setCookie] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    const { sessionToken } = cookies;
    if (!sessionToken) {
      navigate('/login');
    }

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(sessionToken);
        // dispatch(userUpdate(response.data.user));

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getMinutes + response.data.token.expireIn);

        setCookie('sessionToken', response.data.token.accessToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });
      } catch (err: any) {
        if (err.status === 401) {
          console.log('Admin page 驗證失敗');
        }
        console.log(err);
        navigate('/', { replace: true });
      }
    };

    verifyUser();
    setLoading(false);
  }, []);

  return (
    loading ? <Loading /> : <Outlet />
  );
}

export default Admin;
