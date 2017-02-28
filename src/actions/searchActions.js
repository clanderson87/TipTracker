import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ENABLE_SEARCH, 
  CHOOSE_RESTAURANT, 
  CLEAR_RESTAURANT_SELECTION, 
  ADD_RESTAURANT } from './types';


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

export const addRestaurant = ({name, gId}) => {
  const { currentUser } = firebase.auth();
  
  firebase.database().ref(`users/${currentUser.uid}/restaurants`)
    .push({name, gId})
    .then(() => {
      dispatch({type: ADD_RESTAURANT})
    })

}

