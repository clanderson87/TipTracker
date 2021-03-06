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
  editTip,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

const Item = Picker.Item;

class AddTipForm extends Component {
  componentDidMount(){

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
        format='YYYY/MM/DD'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={(date) => this.props.tipDateChanged(date)}
        />
    );
  };

  addOrEdit(tipAmount, tipDate, tipRestaurant, tipShift){
    const mainProps = this.props;
    if(mainProps.selectedTip !== null){
      return {
        onTouch() {mainProps.editTip({...mainProps.selectedTip, 
                    amount: tipAmount, 
                    date: tipDate, 
                    restaurant: tipRestaurant, 
                    shift: tipShift})},
        text: 'Edit'
      }
    } else {
      return {
        onTouch() {mainProps.addTip(tipAmount, tipDate, tipRestaurant, tipShift)},
        text: 'Add'
      }
    }
  }

  renderAddButton(){
    const { tipAmount, tipDate, tipRestaurant, tipShift } = this.props;
    const btnDetails = this.addOrEdit(tipAmount, tipDate, tipRestaurant, tipShift)
    if((tipAmount && tipDate && tipRestaurant && tipShift)){
      return (
        <Button
          success
          block
          onPress={() => btnDetails.onTouch()}
        ><Text>{btnDetails.text}</Text>
        </Button>
      )
    } else {
      return (
        <Button
          disabled
          block
        ><Text>{btnDetails.text}</Text>
        </Button>
      )
    }
  }

  getTipValue(){
    if(this.props.tipAmount == null){
      return this.props.tipAmount;
    } else {
      return this.props.tipAmount.toString();
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
                value={this.getTipValue()} />
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
    selectedTip,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  } = tip;
  return {
    usersRestaurants,
    message,
    selectedTip,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  };
};

export default connect(mapStateToProps, {
  addTip,
  editTip,
  getRestaurants,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(AddTipForm);