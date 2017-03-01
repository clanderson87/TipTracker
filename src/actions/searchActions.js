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
  const { name, gId, price, photos, geometry, rating } = restaurant;
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
      .push({ name, gId, geometry })
      .then(
        fbRef.ref(`restaurants/${gId}`).once('value') //checking if in main restaurants repo
        .then((snapshot) => {
          if(!snapshot.exists()){ //if not, add it to repo
            fbRef.ref(`restaurants/${gId}`)
              .push({name, geometry, price, photos, rating})
              .then(() => {
                successAddAction(restaurant);
              })
              .catch(err => failAddAction(err));
          }
          else {
            console.log("Firebase snapshot is ", snapshot)
            successAddAction(restaurant);
          }
        })
        .catch(err => {
          console.log(err);
          failAddAction(err);
        })
      )
      .catch((err) => { console.log(err), failAddAction(err) });
  }
}