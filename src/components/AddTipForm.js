import React, { Component } from 'react';
import { Container, 
  Text, 
  Button,
  Form,
  Item,
  Input,
  InputGroup,
  Picker,
  Card,
} from 'native-base';
import { Platform, DatePickerIOS, DatePickerAndroid } from 'react-native';
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

class AddTipForm extends Component {
  componentDidMount(){
    this.props.getRestaurants();
  };

  renderPicker(){  
    if(this.props.usersRestaurants.length > 1){
      return (
        <Picker
          iosHeader='Select Workplace'
          mode='dropdown'
          selectedValue={this.props.usersRestaurants[0].name}
          onValueChange={(rest) => this.tipRestuarantChanged(rest)}
        >
          {this.props.usersRestaurants.map((rest, index) => {
            return <Item key={index} label={rest.name} value={rest.gId} />
          })}
        </Picker>
      );
    } else {
      <Input placeholder={this.props.usersRestaurants.toString()} />
    }
  };

  showDatePicker(){
    this.props.showDatePicker();
  }

  renderDatePicker(){
    if(this.props.showDatePicker){
      if(Platform.OS === 'ios'){
        return (
          <DatePickerIOS
            date={this.props.tipDate}
            mode='date'
            onDateChange={(date) => this.props.tipDateChanged(date)} 
          />
        )
      } else{
        return (
          <DatePickerAndroid 
            date={this.props.tipDate}
            mode='default'
            dateSetAction={(date) => this.props.tipDateChanged(date)}
            dismissedAction />
        )
      }
    }
  }

  render(){
    return(
      <Container>
        <Card>
          <Form>
            <InputGroup underline>
              <Input placeholder='$100.00' />
              <Button
                onPress={() => this.showDatePicker()}>
                <Text>Select Date</Text>  
              </Button>
              {this.renderPicker()}
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