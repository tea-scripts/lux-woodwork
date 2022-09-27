import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <MantineProvider theme={{ fontFamily: 'Poppins' }} withNormalizeCSS>
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
