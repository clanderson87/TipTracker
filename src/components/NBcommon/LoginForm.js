import React, { Component } from 'react';
import { Card, InputGroup, Input, Button, Text } from 'native-base';

class LoginForm extends Component {
  render() {
    return (
      <Card>
        <InputGroup underline>
          <Input 
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

export default LoginForm;