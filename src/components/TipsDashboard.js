import React, { Component } from 'react';
import { View, Text, List, ListItem, Button } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
  getInitial,
  addTip,
  getRestaurants,
  deleteTip,
  selectTip,
  unselectTip,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

class TipsDashboard extends Component {
  componentDidMount(){
    this.props.getInitial();
    this.props.getRestaurants();
  }
  
  goToTipDetail(tip){
    this.props.selectTip(tip);
    Actions.TipDetail();
  }

  renderList(){
    if(this.props.usersTips){
      return(
        <List dataArray={this.props.usersTips}
            renderRow={(tip) => 
              <ListItem onPress={() => this.goToTipDetail(tip)}>
                <Text>{tip.amount}</Text>  
              </ListItem>
            }
        />
      )
    }else{
      return <Text>Add some tips to get started!</Text>
    };
  };

  goToAddScreen(){
    this.props.unselectTip();
    Actions.AddTip();
  };

  renderAddButton(){
    return (
      <Button
        block
        success
        onPress={()=>this.goToAddScreen()}>
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
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant,
    selectedTip
  } = tip;
  return { usersTips,
    usersAverage,
    usersProjected,
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
  getInitial,
  getRestaurants,
  addTip,
  deleteTip,
  selectTip,
  unselectTip,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(TipsDashboard);