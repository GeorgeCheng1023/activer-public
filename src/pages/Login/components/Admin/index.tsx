import { useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserIsLoggedIn } from 'store/userAuth';

function Admin() {
  const isLoggined = useAppSelector(getUserIsLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggined) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  /*
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let isMounted = true;
    const controller = new AbortController();

    const admin = async () => {
      try {
        const response = await axiosPrivate.get('/data', {
          signal: controller.signal,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    if (effectRef.current === false) {
      admin();
      console.log('Effect run');
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRef.current = true; // update the value of effectRun to true
    };
  }, []);
*/

  return (
    <Outlet />
  );
}

export default Admin;
