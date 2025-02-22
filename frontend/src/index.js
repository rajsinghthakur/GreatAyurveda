import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='639124704225-c8rm9g3o3vsiicqkdbdlcdm33fga0eut.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
reportWebVitals();
