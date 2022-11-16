/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(localStorage.getItem('persist') || false);

  return (
    <AuthContext.Provider value={{
      auth, setAuth, persist, setPersist,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
