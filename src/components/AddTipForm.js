import React, { Component } from 'react';
import { Container, 
  Text, 
  Button,
  Form,
  Input,
  InputGroup,
  Picker,
  Card,
} from 'native-base';
import { DatePicker } from 'react-native-ui-xg';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
  getInitial,
  getRestaurants,
  addTip,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

const Item = Picker.Item;

class AddTipForm extends Component {
  componentDidMount(){
    //this.props.getRestaurants();
  };

  renderPicker(){  
    if(this.props.usersRestaurants.length > 1){
      return (
        <Picker
          iosHeader='Select Workplace'
          mode='dropdown'
          label='Select Restaurant'
          selectedValue={this.props.tipRestaurant}
          onValueChange={(rest) => this.props.tipRestuarantChanged(rest)}
        > 
          { this.props.usersRestaurants.map((rest, index) => {
            return (<Item key={index} label={rest.name} value={rest.gId} />)
              }
            )
          }
        </Picker>
      );
    } else {
      <Input placeholder={this.props.usersRestaurants.toString()} />
    }
  };

  renderDatePicker(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.props.tipDate}
        mode='date'
        format='MM-DD-YYYY'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={(date) => this.props.tipDateChanged(date)}
        />
    )
  }

  renderAddButton(){
    const { tipAmount, tipDate, tipRestaurant, tipShift } = this.props
    if((tipAmount && tipDate && tipRestaurant && tipShift)){
      return (
        <Button
          success
          block
          onPress={() => this.props.addTip(tipAmount, tipDate, tipRestaurant, tipShift)}
        ><Text>Add</Text>
        </Button>
      )
    } else {
      return (
        <Button
          disabled
          block
        ><Text>Add</Text>
        </Button>
      )
    }
  }

  render(){
    return(
      <Container>
          <Form>
            <InputGroup underline>
              <Input placeholder='$100.00'
                keyboardType='numeric' 
                returnKeyType='done' 
                onChangeText={(val) => this.props.tipAmountChanged(val)} 
                value={this.props.tipAmount} />
              {this.renderDatePicker()}
            </InputGroup>
            <InputGroup>
              {this.renderPicker()}
            </InputGroup>
            <InputGroup underline>
              <Picker
                iosHeader='Select Shift'
                mode='dropdown'
                selectedValue={this.props.tipShift}
                onValueChange={(shift) => this.props.tipShiftChanged(shift)}
              >
                <Item label="Breakfast" value="Breakfast" />
                <Item label="Brunch" value="Brunch" />
                <Item label="Lunch" value="Lunch" />
                <Item label="Happy Hour" value="Happy Hour" />
                <Item label="Dinner" value="Dinner" />
                <Item label="Late Night" value="Late Night" />
              </Picker>
            </InputGroup>
            {this.renderAddButton()}
          </Form>
      </Container>
    )
  }
};

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
  addTip,
  getRestaurants,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(AddTipForm);