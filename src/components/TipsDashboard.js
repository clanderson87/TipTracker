import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { 
  getInitial,
  addTip,
  activateFab,
  cancelFab,
  
} from '../actions/tipActions';

class TipsDashboard extends Component {
  
  
  render(){
    return(
      <View>
        
      </View>
    )
  }
}

const mapStateToProps = ({ tip }) => {
  const { usersTips,
    usersAverage,
    usersProjected,
    usersRestaurants,
    addingModal,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  } = tip;
  return { usersTips,
    usersAverage,
    usersProjected,
    usersRestaurants,
    addingModal,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  };
};
export default connect (mapStateToProps, {
  getInitial, addTip, activateFab, cancelFab
})(TipsDashboard);