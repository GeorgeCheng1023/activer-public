import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from 'pages/Loading';
import { apiUserAuth } from 'api/user';

function Admin() {
  const [cookies, setCookie] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  // const dateFormat = /\d{4}-\d{2}-\d{2}/;

  useEffect(() => {
    const { sessionToken } = cookies;
    if (!sessionToken) {
      navigate('/login');
    }

    // const getAvatar = async (userID: number) => {
    //   try {
    //     const response = await apiGetAvatar(userID);
    //     return `${response.config.baseURL}${response.config.url}`;
    //   } catch (err) {
    //     return '/user.png';
    //   }
    // };

    const verifyUser = async () => {
      try {
        const response = await apiUserAuth(sessionToken);
        // const resUserData: UserDataType = response.data.user;
        // dispatch(updateUser(resUserData));

        // if (resUserData.birthday) {
        //   const date = response.data.user.birthday.match(dateFormat);
        //   if (date) dispatch(updateUser({ ...resUserData, birthday: date[0] }));
        // }
        // const avatar = await getAvatar(resUserData.id);
        // dispatch(updateUser({ ...resUserData, avatar }));

        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getMinutes() + response.data.token.expireIn);

        setCookie('sessionToken', response.data.token.accessToken, {
          expires: expiresDate,
          path: '/',
          sameSite: true,
        });
        setLoading(false);
      } catch (err: any) {
        if (err.status === 401) {
          // eslint-disable-next-line no-console
          console.log('Admin page 驗證失敗');
        }
        // navigate('/', { replace: true });
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
