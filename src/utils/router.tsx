import React from 'react';
import Root, { rootLoader } from 'pages/Root';
import Home, { loader as homeLoader } from 'pages/Home';

import RootErrorBoundary from 'pages/Error';
import NotFound from 'pages/Error/NotFound';
import Loading from 'pages/Loading';

import Activity, { loader as activityLoader } from 'pages/Activity';
import Tag, { loader as tagLoader } from 'pages/Tag';

// Details
import Detail, { action as detailAction, loader as detailLoader } from 'pages/Detail';
import Comment, { addCommentAction, deleteCommentAction } from 'pages/Detail/Comment';
import Vote, { votedAction, unvotedAction } from 'pages/Detail/Vote';

import Login, {
  Admin, ResetPwd, EmailLoading, EmailVerify, ForgetPwd, Register, Verify, PersistLogin,
} from 'pages/Login';
import Search, { loader as searchLoader } from 'pages/Search';

// User
import Crop from 'pages/User/Basic/Crop';
import {
  // revalidate as manageRevalideter,
  action as manageAction,
  loader as manageLoader,
} from 'pages/User/Manage';
import { action as preferenceAction, loader as preferenceLoader } from 'pages/User/Preferences';
import User, {
  Account, Basic, History, Main, Manage, Preferences,
} from 'pages/User';
import { loader as historyLoader } from 'pages/User/History';
import { action as basicAction, loader as basicLoader } from 'pages/User/Basic';
import Record from 'pages/User/History/Record';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    id: 'root',
    loader: rootLoader,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/',
            loader: homeLoader,
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
            element: <Search />,
          },
          {
            path: '/detail/:activityId',
            id: 'detail',
            action: detailAction,
            loader: detailLoader,
            element: <Detail />,
            children: [
              {
                path: 'comment',
                element: <Comment />,
                children: [
                  {
                    path: 'delete/:commentId',
                    action: deleteCommentAction,
                    element: null,
                  },
                  {
                    path: 'new',
                    action: addCommentAction,
                    element: null,
                  },
                ],
              },
              {
                path: 'vote',
                element: <Vote />,
                children: [
                  {
                    action: votedAction,
                    path: 'voted/:tagId',
                    element: null,
                  },
                  {
                    action: unvotedAction,
                    path: 'unvoted/:tagId',
                    element: null,
                  },
                ],
              },
            ],
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
        path: '/tag',
        loader: tagLoader,
        element: <Tag />,
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
            children: [
              {
                path: 'crop',
                element: <Crop />,
              },
            ],
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'manage/:filter?',
            loader: manageLoader,
            // shouldRevalidate: manageRevalideter,
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
