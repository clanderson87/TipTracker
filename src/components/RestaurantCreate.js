import React, { Component } from 'react';
import { Card, Text, InputGroup, Input, Button } from 'native-base';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GOOGLE_PLACES_API_KEY from '../../secrets/GOOGLE_PLACES_API_KEY';


class RestaurantCreate extends Component {
  render() {
    return(
      <Card>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
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
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
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
        <InputGroup>
          <Input placeholder="Search" />
        </InputGroup>
      </Card>
    );
  };
};

export default RestaurantCreate;