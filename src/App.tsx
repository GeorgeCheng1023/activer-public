import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Login/components/Register';
// import Root from './pages/Root';
// import Search from './pages/Search';
// import User, {
//   Basic, Account, History, Preferences, Manage,
// } from './pages/User';
import PersistLogin from './pages/Login/components/PersistLogin';
import Admin from './pages/Login/components/Admin';
import Root from './pages/Root';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/login',
//         element: <Login />,
//       },
//       {
//         path: '/register',
//         element: <Register />,
//       },
//       {
//         path: '/search',
//         element: <Search />,
//       },
//       {
//         path: '/user',
//         element: <User />,
//         children: [
//           {
//             index: true,
//             path: 'basic',
//             element: <Basic />,
//           },
//           {
//             path: 'account',
//             element: <Account />,
//           },
//           {
//             path: 'manage',
//             element: <Manage />,
//           },
//           {
//             path: 'history',
//             element: <History />,
//           },
//           {
//             path: 'preferences',
//             element: <Preferences />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

function App() {
  return (
    // <RouterProvider router={router} />
    <Routes>
      <Route element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PersistLogin />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
