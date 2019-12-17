/**
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import {name as appName} from './app.json';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

const store = finalCreateStore(rootReducer);

const AppProvider = props => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppProvider);
