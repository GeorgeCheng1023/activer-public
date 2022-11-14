import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './pages/Login/context/AuthProvider';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId="844622130486-tg3voh22qmia7rf2723gnmpkop983j23.apps.googleusercontent.com">
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </GoogleOAuthProvider>

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
