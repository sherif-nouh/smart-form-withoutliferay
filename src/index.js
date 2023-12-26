import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./API/axios-global"
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import "bootstrap/dist/js/bootstrap.bundle.min";

import arBundle from './local/ar.json';
import enBundle from './local/en.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; 


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enBundle },
    ar: { translation: arBundle },
  },
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
});

library.add(faCoffee);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
