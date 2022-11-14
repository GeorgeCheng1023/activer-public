/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
