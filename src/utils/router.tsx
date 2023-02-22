import React from 'react';
import Activity, { loader as activityLoader } from 'pages/Activity';
import Detail, { action as detailAction, loader as detailLoader } from 'pages/Detail';
import RootErrorBoundary from 'pages/Error';
import HomeErrorPage from 'pages/Error/HomeErrorPage';
import NotFound from 'pages/Error/NotFound';
import SearchErrorPage from 'pages/Error/SearchErrorPage';

import Home, { loader as homeLoader } from 'pages/Home';

// loader action
import Search, { loader as searchLoader } from 'pages/Search';
import { revalidate as manageRevalideter, action as manageAction, loader as manageLoader } from 'pages/User/Manage';
import { action as preferenceAction, loader as preferenceLoader } from 'pages/User/Preferences';
import { loader as historyLoader } from 'pages/User/History';
import { action as basicAction, loader as basicLoader } from 'pages/User/Basic';

// pages
import Root from 'pages/Root';
import Loading from 'pages/Loading';
import User, {
  Account, Basic, History, Main, Manage, Preferences,
} from 'pages/User';
import Record from 'pages/User/History/Record';
import Login, {
  Admin, ResetPwd, EmailLoading, EmailVerify, ForgetPwd, Register, Verify, PersistLogin,
} from 'pages/Login';

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
        path: '/activity',
        loader: activityLoader,
        element: <Activity />,
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
            path: 'basic/:userId',
            loader: basicLoader,
            action: basicAction,
            element: <Basic />,
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'manage/:filter?',
            loader: manageLoader,
            shouldRevalidate: manageRevalideter,
            action: manageAction,
            id: 'manage',
            element: <Manage />,
          },
          {
            path: 'history',
            loader: historyLoader,
            element: <History />,
          },
          {
            path: 'preferences',
            loader: preferenceLoader,
            action: preferenceAction,
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
