import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,
  InputGroup,
  Input,
  Button,
  Text,
  Spinner,
  Header,
  Title,
  Content } from 'native-base';
import firebase from 'firebase';

import { emailChanged, passwordChanged, loginUser } from '../../actions'

class LoginForm extends Component {

  loginPress(){
    const { email, password, failed } = this.props;
    if(failed == false){
      this.props.loginUser({email, password});
    } else {
      this.props.loginUser({email, password, failed});
    }
  }

  loginButton(props){

    renderTextInLoginButton = (props) => {
      if(props.failed){
        return <Text>Request a new password</Text>
      } else if (props.loading){
        return <Spinner />
      } else if (props.error != ''){
        return <Text>Try Again!</Text>
      } else {
        return <Text>Login in or signup!</Text>
      }
    }
      
    return (
      <Button 
        block
        disabled={!(props.email.includes("@") 
                  && props.email.includes(".") 
                  && props.password.length > 6)
                  || props.loading}
        onPress={() => this.loginPress()}
      >
        {renderTextInLoginButton(this.props)}
      </Button>
    )
  };

  renderPasswordField(props) {
    if(this.props.failed){
      return;
    }
    else {
      return (
        <InputGroup underline>
          <Input
            secureTextEntry
            label='password' 
            placeholder='password' 
            onChangeText={text => this.props.passwordChanged(text)}
            value={this.props.password}
          />
        </InputGroup>
      );
    };
  };

  render() {
    return (
      <Content>
        <Header><Title>Sign up or Login!</Title></Header>
        <Card>
          <InputGroup underline>
            <Input
              onChangeText={text => this.props.emailChanged(text)} 
              label='email'
              placeholder='email'
              value={this.props.email}
            />
          </InputGroup>
          {this.renderPasswordField(this.props)}
          <Text>{this.props.error}</Text>
          {this.loginButton(this.props)}
        </Card>
      </Content>
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