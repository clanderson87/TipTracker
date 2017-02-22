import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, InputGroup, Input, Button, Text } from 'native-base';

import { emailChanged, passwordChanged } from '../../actions'

class LoginForm extends Component {
  
  render() {
    return (
      <Card>
        <InputGroup underline>
          <Input
            onChangeText={text => this.props.emailChanged(text)} 
            label='email'
            placeholder='email'
            value={this.props.email}
          />
        </InputGroup>
        <InputGroup underline>
          <Input
            secureTextEntry
            label='password' 
            placeholder='password' 
            onChangeText={text => this.props.passwordChanged(text)}
            value={this.props.password}
          />
        </InputGroup>
        <Button block>
          <Text>Login</Text>
        </Button>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password
  };
};

export default connect(mapStateToProps, {emailChanged, passwordChanged})(LoginForm);