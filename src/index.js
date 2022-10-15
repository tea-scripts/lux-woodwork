import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <MantineProvider theme={{ fontFamily: 'Poppins' }} withNormalizeCSS>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
  // </React.StrictMode>
);
