import axios from '../api/axios';
import useAuth from './useAuth';

function useLogout() {
  const { setAuth } : any = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      const response = await axios('/logout', {
        withCredentials: true,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}

export default useLogout;