import React from 'react';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Login/components/Register';
import User, {
  Basic, Account, History, Preferences, Manage, Main,
} from 'pages/User';
import Record from 'pages/User/History/Record';
import Root from 'pages/Root';
import Search from 'pages/Search';
import Detail from 'pages/Detail';
import Admin from 'pages/Login/components/Admin';
import NotFound from 'pages/NotFound';
import Loading from 'pages/Loading';
import PersistLogin from 'pages/Login/components/PersistLogin/PersistLogin';
import Verify from 'pages/Login/components/verifyUser/index';
import ForgetPwd from 'pages/Login/components/ForgetPwd';
import ResetPwd from 'pages/Login/components/ChangePassword';
import EmailLoading from 'pages/Login/components/EmailLoad';
import EmailVerify from '../pages/Login/components/EmailVerify/index';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <PersistLogin />,
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
            path: '/detail/:id',
            element: <Detail />,
          },
          {
            path: '/resetpwd',
            element: <ResetPwd />,
          },
        ],
      },
      {
        path: '/verify',
        element: <Verify />,
      },
      {
        path: '/email/loading',
        element: <EmailLoading />,
      },
      {
        path: '/email/verify',
        element: <EmailVerify />,
      },
      {
        path: '/forgetpwd',
        element: <ForgetPwd />,
      },
      {
        path: '/loading',
        element: <Loading />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
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
            element: <Main />,
          },
          {
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
];

function getConfig() {
  return routerConfig;
}

export default getConfig;
