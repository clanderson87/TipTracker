import React, { Component } from 'react';
import { Card, Text, Button, View, InputGroup, Input, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import firebase from 'firebase';
import { enableSearch, chooseRestaurant, clearRestaurantSelection, addRestaurant, getInitialRestaurants } from '../actions/searchActions'
import GOOGLE_PLACES_API_KEY from '../../secrets/GOOGLE_PLACES_API_KEY';

class RestaurantList extends Component {
  componentDidMount(){
    this.props.getInitialRestaurants();
  }

  renderList(){
    if(!this.props.search){
      console.log("this.props.myRests is ", this.props.myRestaurants);
      return(
        <List 
          dataArray={this.props.myRestaurants}
          renderRow={(res) => 
            <ListItem>
              <Text>{res.name}</Text>
            </ListItem>
          }/>
      )
    }
  }

  startSearch(){
    if(this.props.search && this.props.restaurant == undefined){
      return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          listViewDisplayed='auto' // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            console.log(details);
            const { name, geometry, rating, formatted_address, place_id, price_level, photos } = details;
            {this.props.chooseRestaurant({ 
              name,
              geometry,
              address: formatted_address,
              gId: place_id,
              price: price_level || 0,
              rating: rating || 0,
              photos: {
                a: {
                  photo_html: photos[0].html_attributions,
                  photo_reference: photos[0].photo_reference
                },
                b: {
                  photo_html: photos[1].html_attributions,
                  photo_reference: photos[1].photo_reference
                },
                c: {
                  photo_html: photos[2].html_attributions,
                  photo_reference: photos[2].photo_reference
                }
              } || null
              })
            }// 'details' is provided when fetchDetails = true
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_PLACES_API_KEY,
            language: 'en', // language of the results
            types: 'establishment', // default: 'geocode'
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'prominence',
            type: 'restaurant',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlaces={[]}
        />
      )
    } else {
      if(!this.props.search){
        return (
          <View>
            {this.renderList()}
            <Button 
              block
              onPress={this.props.enableSearch}
              >
              <Text>Add New Restaurant</Text>
            </Button>
          </View>
        )
      }
    }
  };

  renderRestaurant(){
    if(this.props.restaurant !== undefined){
      return(
        //So... I need to input-ize all of this so the user has a chance to alter the data before storage.
        <Card>
          <Text>{/*stylize this text! And also the other props in this area!*/}
            {this.props.restaurant.name}
            {/*<RestaurantDetail />goes here*/}
          </Text>
          <Button 
            danger
            onPress={() => this.props.clearRestaurantSelection()}>
            <Text>Cancel</Text>
          </Button>
          <Button
            onPress={()=> this.props.addRestaurant(this.props.restaurant)}>
            <Text>Add</Text>
          </Button>
        </Card>
      )
    }
  }

  render() {
    return(
      <View style={this.styles.viewStyle}>
        {this.startSearch()}
        {this.renderRestaurant()}
      </View>
    );
  };

  styles = {
    viewStyle: {
      flex: 2
    }
  }
};

const mapStateToProps = ({ searchObj }) => {
  const { search, restaurant, myRestaurants } = searchObj;
  return { search, restaurant, myRestaurants };
};

export default connect(mapStateToProps, {
  enableSearch,
  chooseRestaurant,
  clearRestaurantSelection,
  addRestaurant,
  getInitialRestaurants
})(RestaurantList);