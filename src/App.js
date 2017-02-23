import React, { Component } from 'react';
import { 
  Container, 
  Body,
  Footer,
  Text,
} from 'native-base';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import FIREBASE_SECRETS from '../secrets/FIREBASE_SECRETS';
import reducers from './reducers';

import Router from './Router';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(FIREBASE_SECRETS);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App;