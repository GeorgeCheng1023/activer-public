import React from 'react';
import ReactDOM from 'react-dom/client';

// provider
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from 'store';
// component
import App from './App';

// style
import './index.scss';
import 'swiper/css/bundle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <CookiesProvider>
      <GoogleOAuthProvider clientId="844622130486-tg3voh22qmia7rf2723gnmpkop983j23.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </CookiesProvider>
  </ReduxProvider>,
  /* </React.StrictMode> */
);
