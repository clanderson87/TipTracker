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
import {
  dayOfWeek,
  monthOfYear
} from '../common/dateHelpers'

class TipDetail extends Component {
  
  componentDidMount(){
    console.log(this.props.selectedTip);
  }

  getRestaurantName(){
    let rest = Object.values(this.props.usersRestaurants).find((r) => {
      return r.gId === this.props.tipRestaurant;
    })
    return rest.name;
  }

  renderTipDate(){
    const date = (new Date(this.props.tipDate));
    return `${dayOfWeek(date.getDay())}, ${monthOfYear(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
  }
  
  render(){
    return(
      <Card>
        <Text>You made ${this.props.tipAmount}</Text>
        <Text>on {this.renderTipDate()}</Text>
        <Text>at {this.getRestaurantName()}</Text>
        <Text>during {this.props.tipShift}</Text>
        <Button
          onPress={() => Actions.AddTip()}>
          <Text>Edit</Text>
        </Button>
        <Button
          danger
          onPress={() => this.props.deleteTip(this.props.selectedTip)}>
          <Text>Delete</Text>
        </Button>
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
    tipRestaurant,
    selectedTip
  } = tip;
  return {
    usersRestaurants,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant,
    selectedTip
  };
};

export default connect(mapStateToProps, {
  deleteTip
})(TipDetail);