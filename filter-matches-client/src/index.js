import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './container/App/App';
import { appSaga } from './container/App/saga';

import appReducer from './container/App/reducer'

// import * as serviceWorker from './serviceWorker';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = [
    applyMiddleware(sagaMiddleware),
];

  const store = createStore(
    appReducer,
    composeEnhancers(...enhancers)
  );

// Extensions
store.runSaga = sagaMiddleware.run(appSaga);
store.asyncReducers = {};


ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
