import React, { Component } from 'react';
import { View, Text, List, ListItem, Button } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
  getInitial,
  addTip,
  activateBtn,
  cancelBtn,
  getRestaurants,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

class TipsDashboard extends Component {
  componentDidMount(){
    this.props.getInitial();
  }
  
  renderList(){
    if(this.props.usersTips){
      return(
        <List dataArray={this.props.usersTips}
            renderRow={(tip) => 
              <ListItem>
                <Text>{tip.amount}</Text>  
              </ListItem>
            }
        />
      )
    }else{
      return <Text>Add some tips to get started!</Text>
    };
  };

  renderAddButton(){
    return (
      <Button
        block
        success
        onPress={()=>Actions.AddTip()}>
        <Text>Add Tip!</Text>
      </Button>
    );
  };

  renderAverage(){
    return (
      <Text>{this.props.usersAverage}</Text>
    );
  };

  render(){
    return(
      <View>
        {this.renderAverage()}
        {this.renderList()}
        {this.renderAddButton()}
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
  getRestaurants,
  addTip,
  activateBtn,
  cancelBtn,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(TipsDashboard);