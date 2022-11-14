import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Admin() {
  // const [user, setUser] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let isMounted = true;
    const controller = new AbortController();

    const admin = async () => {
      try {
        const response = await axiosPrivate.get('/data', {
          signal: controller.signal,
        });
        console.log(response?.data);
      } catch (err) {
        console.log('error');
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    admin();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>  Admin </h1>
      <br />
      {/* {user} */}
    </div>
  );
}

export default Admin;
