import React from 'react';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Login/components/Register';
import User, {
  Basic, Account, History, Preferences, Manage,
} from 'pages/User';
import Record from 'pages/User/History/Record';
import Root from 'pages/Root';
import Search from 'pages/Search';
import Detail from 'pages/Detail';
import Admin from 'pages/Login/components/Admin';
import NotFound from 'pages/NotFound';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },

      {
        element: <Admin />,
        children: [
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
              {
                path: 'record',
                element: <Record />,
              },

            ],
          },

        ],
      },

      {
        path: '/detail/:id',
        element: <Detail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

/*
export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Home />,
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
          {
            path: 'record',
            element: <Record />,
          },

        ],
      },

      {
        path: '/detail',
        element: <Detail />,
      },

    ],
  },
];
*/

function getConfig() {
  return routerConfig;
}

export default getConfig;
