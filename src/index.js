import React from 'react';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import "react-datepicker/dist/react-datepicker.css";

accountService.refreshToken().finally(startApp);

function startApp() { 
  render(
  <React.StrictMode>
    <BrowserRouter history={history}>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)};

