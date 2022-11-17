import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth }: any = useContext(AuthContext);
  useDebugValue(auth, (Auth) => (Auth?.username ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
