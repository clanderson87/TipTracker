import React, { Component } from 'react';
import { Container, 
  Text, 
  Button,
  Form,
  Item,
  Input,
  InputGroup,
  Picker,
  Card
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
  getInitial,
  getRestaurants,
  addTip,
  activateBtn,
  cancelBtn,
  tipAmountChanged,
  tipDateChanged,
  tipRestuarantChanged,
  tipShiftChanged
} from '../actions/tipActions';

class AddTipForm extends Component {
  componentDidMount(){
    this.props.getRestaurants();
  };

  renderPickerChoices(){
    this.props.usersRestaurants.forEach((rest) => {
      return <Text>{rest.name}</Text>
    });
  }

  renderPicker(){  
    if(this.props.usersRestaurants.length > 1){
      return (
        <Picker
          iosHeader='Select Workplace'
          mode='dropdown'
          selectedValue={this.props.usersRestaurants[0]}
          onValueChange={(rest) => this.tipRestuarantChanged(rest)}
        >
          {this.renderPickerChoices()}
        </Picker>
      );
    } else {
      <Input placeholder={this.props.usersRestaurants.toString()} />
    }
  }

  render(){
    return(
      <Container>
        <Card>
          <Form>
            <InputGroup underline>
              <Input placeholder='$100.00' />
              <Input placeholder='date' />
              {this.renderPickerChoices()}
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
    addingModal,
    message,
    tipAmount,
    tipDate,
    tipShift,
    tipRestaurant 
  } = tip;
  return {
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
  getRestaurants,
  cancelBtn,
  tipAmountChanged,
  tipRestuarantChanged,
  tipShiftChanged,
  tipDateChanged
})(AddTipForm);