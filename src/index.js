import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory as createHistory } from "history";
import { SnackbarProvider } from 'notistack';

import {
  Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { StateMachineProvider, createStore, DevTool } from 'little-state-machine'
import users from './models/user_model'
// create your store
createStore({
  nextUserIdCounter: 6,
  users
});
export const history = createHistory();
ReactDOM.render(
  <StateMachineProvider>
    <SnackbarProvider maxSnack={3} preventDuplicate
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
      {process.env.NODE_ENV !== 'production' && <DevTool />}
      <Router history={history}><App /></Router>
    </SnackbarProvider>
  </StateMachineProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
