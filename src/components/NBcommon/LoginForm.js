import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, InputGroup, Input, Button, Text } from 'native-base';

import { emailChanged } from '../../actions'

class LoginForm extends Component {
  onEmailChange(text){

  }
  
  render() {
    return (
      <Card>
        <InputGroup underline>
          <Input
            onChangeText={this.onEmailChange.bind(this)} 
            label='email'
            placeholder='email'
          />
        </InputGroup>
        <InputGroup underline>
          <Input
            secureTextEntry
            label='password' 
            placeholder='password' 
          />
        </InputGroup>
        <Button block>
          <Text>Login</Text>
        </Button>
      </Card>
    )
  }
}

export default connect(null, {emailChanged} )(LoginForm);