import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { setupStore} from "./store/store";
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
import  "./entitysData/i18n/i18n";
import i18n from "./entitysData/i18n/i18n";
import { I18nextProvider } from 'react-i18next';

const store = setupStore()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <App />
      </Router>
    </I18nextProvider>
  </Provider>
)
