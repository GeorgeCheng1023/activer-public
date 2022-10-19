import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  RouterProvider, createBrowserRouter,
} from 'react-router-dom';

// components
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';
import User, {
  Basic, Account, History, Preferences, Manage,
} from './pages/User';

const router = createBrowserRouter([
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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
