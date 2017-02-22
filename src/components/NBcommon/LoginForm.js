import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, InputGroup, Input, Button, Text } from 'native-base';

import { emailChanged, passwordChanged, loginUser } from '../../actions'

class LoginForm extends Component {

  loginPress(){
    const { email, password } = this.props;
    this.props.loginUser({email, password});
  }
  
  loginButton(props){
    if(props.error != ''){
      if(props.failed) {
        return <Button 
                block
                danger
              >
                <Text>Request a new password.</Text>
              </Button>
        }
      return <Button 
              block
              warning
              onPress={() => this.loginPress()}
            >
              <Text>Login failed. Please Try Again!</Text>
            </Button>
    }
    else if (props.loading){
      return <Button 
              block
              onPress={() => this.loginPress()}
            >
              <Text>L O A D I N G</Text>
            </Button>
    }
    else {
      return <Button 
              block
              onPress={() => this.loginPress()}
            >
              <Text>Login</Text>
            </Button>
    }
  }

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
        {this.loginButton(this.props)}
      </Card>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading, failed } = auth;
  return { email, password, error, loading, failed };
};

export default connect(mapStateToProps, {
  emailChanged, 
  passwordChanged,
  loginUser
})(LoginForm);