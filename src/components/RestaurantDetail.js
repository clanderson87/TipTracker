import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { 
  clearRestaurantSelection, 
  addRestaurant,
  deleteRestaurant
} from '../actions/searchActions'

class RestaurantDetail extends Component {
  
  renderAddButtons(){
    let addable = true;
    const loopNestedObj = (obj, match) => {
      Object.entries(obj).forEach(([key, val]) => {
        if (val === match) {addable = false};
        if ((val) && (typeof(val) === 'object')){ 
          loopNestedObj(val, match)}
      });
    }; // blueprint code because that was annoying as hell.
    loopNestedObj(this.props.myRestaurants, this.props.restaurant.gId)
    console.log('addable is ', addable)
    if(addable === true){
      return (
        <View>
          <Button
            onPress={() => this.props.clearRestaurantSelection()}>
            <Text>Cancel</Text>
          </Button>
          <Button
            success
            onPress={()=> this.props.addRestaurant(this.props.restaurant)}>
            <Text>Add Restaurant</Text>
          </Button>
        </View>
      )
    } else {
        return (
          <View>
            <Button 
              onPress={() => this.props.clearRestaurantSelection()}>
            <Text>Cancel</Text>
          </Button>
            <Button
              danger
              onPress={() => this.props.deleteRestaurant(this.props.restaurant)}
            ><Text>Delete this restaurant</Text></Button>
          </View>
        )
      }
  };
  
  render(){
    return(
      <View>
        <Text>
          {this.props.restaurant.name}
          {this.props.restaurant.gId}
        </Text>
        {this.renderAddButtons()}
      </View>
    )
  }
}

const mapStateToProps = ({ searchObj }) => {
  const { restaurant, myRestaurants } = searchObj;
  return { restaurant, myRestaurants };
};
export default connect (mapStateToProps, {
  clearRestaurantSelection,
  addRestaurant,
  deleteRestaurant
})(RestaurantDetail);