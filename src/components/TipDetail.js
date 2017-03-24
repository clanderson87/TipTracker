import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, 
  Text, 
  Button,
  Form,
  Input,
  InputGroup,
  Picker,
  Card,
} from 'native-base';
import { connect } from 'react-redux';
import {
  deleteTip
} from '../actions/tipActions';

class TipDetail extends Component {
  
  getRestaurantName(){
    let rest = Object.values(this.props.usersRestaurants).find((r) => {
      return r.gId === this.props.tipRestaurant;
    })
    return rest.name;
  }

  renderDateDetails(){
    let date = new Date()
    date.setTime(Date.parse(this.props.tipDate))
    return date.toDateString();
  }
  
  render(){
    return(
      <Card>
        <Text>You made ${this.props.tipAmount}</Text>
        <Text>on {this.renderDateDetails()}</Text>
        <Text>at {this.getRestaurantName()}</Text>
        <Text>during {this.props.tipShift}</Text>
      </Card>
    )
  }
}

const mapStateToProps = ({ tip }) => {
  const {
    usersRestaurants,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  } = tip;
  return {
    usersRestaurants,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  };
};

export default connect(mapStateToProps, {
  deleteTip
})(TipDetail);