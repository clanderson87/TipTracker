import React, { Component } from 'react';
import { Card, Text, Button, View, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import firebase from 'firebase';
import { enableSearch, chooseRestaurant, clearRestaurantSelection, addRestaurant } from '../actions/searchActions'
import GOOGLE_PLACES_API_KEY from '../../secrets/GOOGLE_PLACES_API_KEY';

class RestaurantList extends Component {
  componentDidMount(){
    //firebase.auth()
    //get users Restaurants
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
          <Button 
            block
            onPress={this.props.enableSearch}
            >
            <Text>Add New Restaurant</Text>
          </Button>
        )
      }
    }
  };

  renderRestaurant(){
    if(this.props.restaurant !== undefined){
      return(
        //So... I need to input-ize all of this so the user has a chance to alter the data before storage.
        <Card>
          <InputGroup underline>
          <Input
            label='Restaurant Name' 
            onChangeText={text => this.props.restaurantChanged('name', text)}
            value={this.props.restaurant.name}
          />
          <Input 
            label='Restaurant Address'
            onChangeText={text => this.props.restaurantChanged('address', text)}
            value={this.props.restaurant.address}
          />
          <Input
            label='Restaurant Rating'
            onChangeText={text => this.props.RestaurantChanged('rating', text)}
            value={this.props.restaurant.rating}
          />
          <Input
            label='Average Check'
            onChangeText={text => this.props.restaurantChanged('price', text)}
            value={this.props.restaurant.price}
          />
          </InputGroup>
          {/*<Card>
          <Text>{/*stylize this text! And also the other props in this area!
            {this.props.restaurant.name}
            {/*<RestaurantDetail />goes here*
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
        </Card>*/}
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
  const { search, restaurant } = searchObj;
  return { search, restaurant };
};

export default connect(mapStateToProps, {
  enableSearch,
  chooseRestaurant,
  clearRestaurantSelection,
  addRestaurant
})(RestaurantList);