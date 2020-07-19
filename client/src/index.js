import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import { SnackbarProvider } from 'notistack';

// context
import { WSProvider } from './context/provider/WSContext';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} closeAction={true}>
      <Provider store={store}>
        <WSProvider>
          <App />
        </WSProvider>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
