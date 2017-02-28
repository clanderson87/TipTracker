import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ENABLE_SEARCH, CHOOSE_RESTAURANT, CLEAR_RESTAURANT_SELECTION } from './types';

export const enableSearch = () => {
  return {
    type: ENABLE_SEARCH
  };
};

export const chooseRestaurant = (restaurant) => {
  return {
    type: CHOOSE_RESTAURANT,
    payload: restaurant
  }
}

export const clearRestaurantSelection = () => {
  return {
    type: CLEAR_RESTAURANT_SELECTION
  }
}

