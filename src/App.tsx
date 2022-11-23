import React from 'react';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import { routerConfig } from './utils/router';

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
