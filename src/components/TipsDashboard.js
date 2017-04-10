import React, { Component } from 'react';
import { FlatList } from 
import { View, Text, List, ListItem, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
        style={styles.addBtnStyle}
        onPress={()=>this.goToAddScreen()}>
        <Text>Add Tip!</Text>
      </Button>
    );
  };

  renderAverage(){
    return (
      <Grid style={{backgroundColor: '#27aa45'}}>
        <Row size={1}/>
        <Row size={2}>
          <Text style={styles.avgStyle}>{this.props.usersAverage}</Text>
        </Row>
        <Row size={1} />
      </Grid>
    );
  };

  render(){
    return(
      <Grid style={styles.viewStyle}>
        <Row size={1}>{this.renderAverage()}</Row>
        <Row size={4}>{this.renderList()}</Row>
        {this.renderAddButton()}
      </Grid>
    )
  }
};

const styles = {
  viewStyle : {
    flexDirection: 'column',
  },
  listItemStyle : {

  },
  avgStyle : {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f9fcfa'
  },
  addBtnStyle : {
    backgroundColor: '#27aa45',
    marginBottom: 10
  }
}

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