import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ENABLE_SEARCH, CHOOSE_RESTAURANT } from './types';

export const enableSearch = () => {
  console.log("Search is enabled!");
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

