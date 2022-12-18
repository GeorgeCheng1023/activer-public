import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loading from 'pages/Loading';

function Admin() {
  const [cookies] = useCookies<string>(['user']);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.sessionToken) {
      navigate('/login', { state: { from: location }, replace: true });
    }
    setLoading(false);
  }, []);

  return (
    loading ? <Loading /> : <Outlet />
  );
}

export default Admin;
