import React from 'react';
import Home, { loader as homeLoader } from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Login/components/Register';
import User, {
  Basic, Account, History, Preferences, Manage, Main,
} from 'pages/User';
import { loader as manageLoader } from 'pages/User/Manage';
import ManageActivity, { action as manageAction } from 'pages/User/Manage/components/ManageActivity';
import { loader as preferenceLoader } from 'pages/User/Preferences';
import { loader as historyLoader } from 'pages/User/History';
import Record from 'pages/User/History/Record';
import Root from 'pages/Root';
import Search, { loader as searchLoader } from 'pages/Search';
import Detail, { loader as detailLoader, action as detailAction } from 'pages/Detail';
import Admin from 'pages/Login/components/Admin';
import NotFound from 'pages/Error/NotFound';
import Loading from 'pages/Loading';
import PersistLogin from 'pages/Login/components/PersistLogin/PersistLogin';
import Verify from 'pages/Login/components/verifyUser/index';
import ForgetPwd from 'pages/Login/components/ForgetPwd';
import ResetPwd from 'pages/Login/components/ChangePassword';
import EmailLoading from 'pages/Login/components/EmailLoad';
import SearchErrorPage from 'pages/Error/SearchErrorPage';
import HomeErrorPage from 'pages/Error/HomeErrorPage';
import RootErrorBoundary from 'pages/Error';

import EmailVerify from '../pages/Login/components/EmailVerify/index';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/',
            loader: homeLoader,
            errorElement: <HomeErrorPage />,
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
            loader: searchLoader,
            errorElement: <SearchErrorPage />,
            element: <Search />,
          },
          {
            path: '/detail/:id?',
            loader: detailLoader,
            action: detailAction,
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
    errorElement: <RootErrorBoundary />,
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
            path: 'manage/:filterId?',
            loader: manageLoader,
            id: 'manage',
            action: manageAction,
            element: <Manage />,
            children: [
              {
                path: '',
                element: <ManageActivity />,
              },
            ],
          },
          {
            path: 'history',
            loader: historyLoader,
            element: <History />,
          },
          {
            path: 'preferences',
            loader: preferenceLoader,
            element: <Preferences />,
          },
          {
            path: 'record/:activityId',
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
