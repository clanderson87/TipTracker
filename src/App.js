import React, { Component } from 'react';
import { 
  Container, 
  Header,
  Title,
  Content,
  Body,
  Footer,
  Card, 
  Text,
} from 'native-base';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import FIREBASE_SECRETS from '../secrets/FIREBASE_SECRETS';
import reducers from './reducers';

import LoginForm from './components/NBcommon/LoginForm';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(FIREBASE_SECRETS);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Title>
              Main Title!
            </Title>
          </Header>
          <Content>
            <LoginForm />
          </Content>
          <Footer>
            <Text>
              Main footer!
            </Text>
          </Footer>
        </Container>
      </Provider>
    )
  }
}

export default App;