import React, { Component } from 'react';
import { Card, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { enableSearch } from '../actions/searchActions'
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
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
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
    }
  }

  render() {
    return(
      <Card>
        <Text>Ruby Tuesday</Text>
        <Text>Yolos</Text>
        <Text>Chagos</Text>
        <Text>F. Scotts</Text>
        <Text>The Southern</Text>
        <Button 
          block
          onPress={this.startSearch(this.props)}
          >
          <Text>Add Restaurant</Text>
        </Button>
      </Card>
    );
  };
};


const mapStateToProps = ({ srch }) => {
  const { search } = srch;
  return { search };
};

export default connect(mapStateToProps, {
  enableSearch
})(RestaurantList);