import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  ENABLE_SEARCH, 
  CHOOSE_RESTAURANT, 
  CLEAR_RESTAURANT_SELECTION, 
  ADD_RESTAURANT,
  RESTAURANT_ADD_FAILED,
  RESTAURANT_SUCCESSFULLY_ADDED
} from './types';


export const enableSearch = () => {
  return {
    type: ENABLE_SEARCH
  };
};

export const chooseRestaurant = restaurant => {
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

export const addRestaurant = restaurant => {
  const { currentUser } = firebase.auth();
  const { gId } = restaurant;
  const fbRef = firebase.database();

  return (dispatch) => {
    const successAddAction = (rest) => {
      dispatch({
        type: RESTAURANT_SUCCESSFULLY_ADDED,
        payload: rest
      })
    }

    const failAddAction = (err) => {
      dispatch({
        type: RESTAURANT_ADD_FAILED,
        payload: err
      })
    }

    fbRef.ref(`users/${currentUser.uid}/restaurants`) //adding to user's restaurants
      .push(gId)
        .then(
          successAddAction(restaurant)
        )
        .catch(err => failAddAction(err));
  }
}