import React from 'react';
import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

// pages
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
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
    <RouterProvider router={router} />
  );
}

export default App;
