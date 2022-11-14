import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth }: any = useContext(AuthContext);
  useDebugValue(auth, (Auth) => (Auth?.user ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
