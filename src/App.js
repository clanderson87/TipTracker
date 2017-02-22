import React, { Component } from 'react';
import { 
  Container, 
  Header,
  Title,
  Content,
  Body,
  Footer,
  Card
} from 'native-base';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import FIREBASE_SECRETS from '../secrets/FIREBASE_SECRETS';
import reducers from './reducers';

import LoginForm from './components/NBcommon/LoginForm';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(FIREBASE_SECRETS);
  }
  
  render() {
    return (
      <Provider store={createStore(reducers)}>
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