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
  
  render(){
    return(
      <Text>
        {this.props.tipAmount}
        {this.props.tipDate}
        {this.getRestaurantName()}
        {this.props.tipShift}
      </Text>
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