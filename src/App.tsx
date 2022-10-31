import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

// pages
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Login/components/Register';
import Search from './pages/Search';
import User, {
  Basic, Account, History, Preferences, Manage,
} from './pages/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/user',
        element: <User />,
        children: [
          {
            index: true,
            path: 'basic',
            element: <Basic />,
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'manage',
            element: <Manage />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'preferences',
            element: <Preferences />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId="844622130486-tg3voh22qmia7rf2723gnmpkop983j23.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
