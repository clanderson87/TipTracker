import React, { Component } from 'react';
import { Container, 
  Text, 
  Button,
  Form,
  // Item,
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
  showDatePicker,
  cancelDatePicker,
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
      console.log(this.props.tipRestaurant)
      return (
        <Picker
          iosHeader='Select Workplace'
          mode='dropdown'
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

  render(){
    return(
      <Container>
        <Card>
          <Form>
            <InputGroup underline>
              <Input placeholder='$100.00' onChangeText={(val) => this.props.tipAmountChanged(val)} />
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
          </Form>
        </Card>
      </Container>
    )
  }
};

const mapStateToProps = ({ tip }) => {
  const {
    usersRestaurants,
    datePicker,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  } = tip;
  return {
    usersRestaurants,
    datePicker,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  };
};

export default connect(mapStateToProps, {
  getRestaurants,
  showDatePicker,
  cancelDatePicker,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(AddTipForm);