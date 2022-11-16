import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Admin() {
  // const [user, setUser] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const effectRef = useRef(false);

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

  return (
    <div>
      <h1>  Admin </h1>
      <br />
      {/* {user} */}
    </div>
  );
}

export default Admin;
