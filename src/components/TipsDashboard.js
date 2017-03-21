import React, { Component } from 'react';
import { View, Text, Button, List } from 'native-base';
import { connect } from 'react-redux';
import { 
  getInitial,
  addTip,
  activateFab,
  cancelFab,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

class TipsDashboard extends Component {
  componentDidMount(){
    console.log("this.props is ", this.props);
    this.props.getInitial();
  }
  
  render(){
    return(
      <View>
        {/*<List dataArray={this.props.usersTips}
          renderRow={(tip) => 
            <ListItem>
              <Text>{tip}</Text>  
            </ListItem>
          }
        />*/}
        <Text>Anything is happening</Text>
      </View>
    )
  }
};

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

export default connect(mapStateToProps, {
  getInitial,
  addTip,
  activateFab,
  cancelFab,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(TipsDashboard);