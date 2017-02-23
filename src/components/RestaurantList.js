import React, { Component } from 'react';
import { Card, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { enableSearch, chooseRestaurant } from '../actions/searchActions'
import GOOGLE_PLACES_API_KEY from '../../secrets/GOOGLE_PLACES_API_KEY';

class RestaurantList extends Component {
  startSearch(){
    if(this.props.search){
      return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          listViewDisplayed='auto' // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            const { name, geometry, rating, formatted_address, id, price_level } = details;
            {this.props.chooseRestaurant({ 
              name,
              geometry,
              rating,
              formatted_address,
              gId: id,
              price: price_level
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
            type: 'food',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          predefinedPlaces={[]}
        />
      )
    } else {
      return (
        <Button 
          block
          onPress={this.props.enableSearch}
          >
          <Text>Add New Restaurant</Text>
        </Button>
      )
    }
  };

  renderRestaurant(){
    if(this.props.restaurant !== undefined){
      return(
        <Text>{this.props.restaurant.name}</Text>
      )
    }
  }

  render() {
    return(
      <Card>
        {this.startSearch()}
        {this.renderRestaurant()}
      </Card>
    );
  };
};

const mapStateToProps = ({ searchObj }) => {
  const { search, restaurant } = searchObj;
  return { search, restaurant };
};

export default connect(mapStateToProps, {
  enableSearch,
  chooseRestaurant
})(RestaurantList);